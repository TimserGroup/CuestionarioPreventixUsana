import React, { useState, useEffect, useReducer } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { questions, initialState, reducer } from './questionData';
import SliderInput from './SliderInput';
import DateInput from './DateInput';
import QRCode from 'qrcode.react';
import './AppointmentForm.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppointmentForm = () => {
    const { register, handleSubmit, setValue, getValues, reset, formState: { errors } } = useForm();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [showFastingError, setShowFastingError] = useState(false);
    const [weight, setWeight] = useState(70);
    const [height, setHeight] = useState(170);
    const [birthDate, setBirthDate] = useState(null);
    const [lastMealTime, setLastMealTime] = useState(null);
    const [fastingHours, setFastingHours] = useState('0');
    const [submittedData, setSubmittedData] = useState(null);
    const [responses, setResponses] = useState([]);
    const [cachedData, setCachedData] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);

    const calculateFastingHours = (selectedAnswer) => {
        switch(selectedAnswer) {
            case '4 Horas':
                return '4';
            case '5 a 6 Horas':
                return '5-6';
            case 'Más de 6 Horas':
                return '6+';
            default:
                return '0';
        }
    };

    const validateLastName = (lastName) => {
        const names = lastName.split(' ');
        const uniqueNames = new Set(names);
        return Array.from(uniqueNames).join(' ');
    };

    const getMexicoCityTime = () => {
        const mexicoCityOffset = -6;
        const currentTime = new Date();
        const utcTime = currentTime.getTime() + currentTime.getTimezoneOffset() * 60000;
        return new Date(utcTime + (3600000 * mexicoCityOffset));
    };

    const isMinor = (birthDate) => {
        const now = getMexicoCityTime();
        const birth = new Date(birthDate);
        const age = now.getFullYear() - birth.getFullYear();
        const monthDiff = now.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
            return age - 1;
        }
        return age;
    };

    const onSubmit = async (formData) => {
        const selectedLocation = formData.sampleLocation;
        const sampleLocationQuestion = questions.find(q => q.field === 'sampleLocation');
        const sampleLocationValue = sampleLocationQuestion.mapping[selectedLocation] || null;

        if (cachedData.patientLastName) {
            cachedData.patientLastName = validateLastName(cachedData.patientLastName);
        }

        if (cachedData.detectedConditions && Array.isArray(cachedData.detectedConditions)) {
            cachedData.detectedConditions = cachedData.detectedConditions.join('; ');
        }

        const formattedData = {
            ...cachedData,
            privacyConsent: cachedData.privacyConsent === "Sí acepto",
            informedConsent: cachedData.informedConsent === "Sí acepto",
            weight: parseFloat(cachedData.weight) || weight,
            height: parseFloat(cachedData.height) || height,
            birthDate: birthDate ? birthDate.toISOString() : null,
            lastMealTime: lastMealTime,
            fastingHours: fastingHours,
            sampleLocation: cachedData.sampleLocation || "default location",
            sampleLocationValue: sampleLocationValue,
            email: cachedData.email,
            responses
        };

        try {
            let response;
            if (!state.appointmentId) {
                response = await axios.post('https://webapitimser.azurewebsites.net/api/v1/appointment/post', formattedData, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                dispatch({ type: 'setAppointmentId', payload: response.data.appointment._id });
            } else {
                response = await axios.put(`https://webapitimser.azurewebsites.net/api/v1/appointment/${state.appointmentId}`, formattedData, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            }
            toast.success('Formulario enviado con éxito');
            setSubmittedData(formattedData);
            setIsSubmitted(true);
        } catch (error) {
            toast.error(error.response?.data.message || "A ocurrido un error al enviar el cuestionario.");
        }
    };

    const handleNext = () => {
        const currentQuestion = questions[state.index];
        let answer = getValues()[currentQuestion.field];

        if (currentQuestion.type === 'date') {
            answer = birthDate;
        }

        if (currentQuestion.type === 'slider') {
            if (currentQuestion.field === 'weight') {
                answer = weight;
            } else if (currentQuestion.field === 'height') {
                answer = height;
            }
        }

        if (currentQuestion.type === 'choice' && currentQuestion.id === 'lastMealTimeQ') {
            answer = getValues()[currentQuestion.field];
            setLastMealTime(answer);
            setFastingHours(calculateFastingHours(answer));
            if (calculateFastingHours(answer) === '0') {
                toast.error("Debe haber pasado al menos 4 horas desde tu última comida.");
                return;
            }
        }

        if (currentQuestion.field === 'birthDate') {
            const age = isMinor(answer);
            if (age < 18) {
                toast.error("Debes ser mayor de edad para continuar.");
                return;
            }
        }

        if (currentQuestion.field === 'confirmEmail') {
            const email = cachedData.email;
            if (email !== answer) {
                toast.error("El correo de confirmación no coincide con el correo ingresado.");
                return;
            }
        }

        const numericFields = ['firstMenstruationAge', 'firstSexualRelationAge', 'papanicolaouYear', 'colposcopyYear', 'naturalBirths', 'cesareans', 'abortionCount'];
        if (numericFields.includes(currentQuestion.field)) {
            const numericAnswer = parseInt(answer, 10);
            if (isNaN(numericAnswer) || numericAnswer < 0) {
                toast.error(currentQuestion.validation?.errorMessage || "Por favor, ingresa un valor válido en formato numérico.");
                return;
            } else {
                answer = numericAnswer;
            }
        }

        if (!answer && answer !== 0) {
            toast.error("Por favor, responda la pregunta antes de continuar.");
            return;
        }

        toast.info(`Respuesta ingresada: ${answer}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        setCachedData(prevData => ({
            ...prevData,
            [currentQuestion.field]: answer
        }));

        setResponses(prevResponses => [...prevResponses, { question: currentQuestion.question, answer }]);

        if (currentQuestion.id === 'fastingHoursQ' && answer === 'No') {
            setShowFastingError(true);
        } else {
            setShowFastingError(false);
            if (currentQuestion.nextq) {
                let nextQuestionId;
                if (typeof currentQuestion.nextq === 'object') {
                    nextQuestionId = currentQuestion.nextq[answer];
                } else {
                    nextQuestionId = currentQuestion.nextq;
                }

                if (nextQuestionId === 'showFastingError') {
                    setShowFastingError(true);
                } else if (nextQuestionId === 'close') {
                    handleSubmit(onSubmit)();
                } else {
                    const nextIndex = questions.findIndex(q => q.id === nextQuestionId);
                    if (nextIndex !== -1) {
                        dispatch({ type: 'setIndex', payload: nextIndex });
                        setValue(currentQuestion.field, '');
                    }
                }
            } else {
                dispatch({ type: 'nextQuestion' });
                setValue(currentQuestion.field, '');
            }
        }
    };

    const handlePrevious = () => {
        const previousIndex = state.index - 1;
        if (previousIndex >= 0) {
            dispatch({ type: 'setIndex', payload: previousIndex });
        }
    };

    const handleAddAnotherForm = () => {
        reset();
        dispatch({ type: 'reset' });
        setShowFastingError(false);
        setResponses([]);
        setCachedData({});
        setIsSubmitted(false);
    };

    const currentQuestion = questions[state.index];

    useEffect(() => {
        if (currentQuestion && currentQuestion.type !== 'choice') {
            setValue(currentQuestion.field, cachedData[currentQuestion.field] || '');
        }
    }, [state.index, setValue, getValues, currentQuestion]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const unansweredQuestions = [];

        questions.forEach((question, index) => {
            const answer = getValues()[question.field];
            if (!answer) {
                unansweredQuestions.push(question.question);
            }
        });

        if (unansweredQuestions.length > 0) {
            toast.error(`Por favor, responda las siguientes preguntas: ${unansweredQuestions.join(', ')}`);
        } else {
            handleSubmit(onSubmit)();
        }
    };

    return (
        <div className="appointment-page">
            <ToastContainer />
            <div className="logos"> 
                <img src="/Logo-Preventix.png" alt="logo" className="logo-img"/> 
                <img src="/usanalogo.png" alt="logousana" className="logo-img"/> 
            </div>
            

            <div className="container">
                {isSubmitted ? (
                    <div className="thank-you-message">
                        <h2>¡Muchas gracias por tu tiempo y participación!</h2>
                        <p>Tus respuestas se enviaron con éxito. Gracias por ser parte de la familia Preventix y contribuir a mejorar la atención médica para todas las mujeres.</p>
                        <div className="qr-code-container">
                            <QRCode value={state.appointmentId} />
                        </div>
                    </div>
                ) : (
                    <div className="center">
                        {showFastingError ? (
                            <div className="fasting-error">
                                <p>Gracias por tu interés en realizarte la prueba. Para garantizar resultados precisos, es necesario un mínimo de 4 horas de ayuno. Si no cumples con este requisito, te pedimos reprogramar tu cita. </p>
                                <p>Por favor acude con el personal en el sitio de muestra.</p>
                                <p>Agradecemos tu comprensión.</p>
                                <button onClick={handleAddAnotherForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Reiniciar Formulario
                                </button>
                            </div>
                        ) : (
                            <form id="dynamic" onSubmit={handleFormSubmit}>
                                <div className="question-wrap">
                                    <div className="question">
                                        {currentQuestion.question}
                                        {currentQuestion.explanation && (
                                            <span
                                                className="info-icon"
                                                onClick={() => setShowExplanation(!showExplanation)}
                                            >
                                                ❔
                                            </span>
                                        )}
                                    </div>
                                    {showExplanation && currentQuestion.explanation && (
                                        <div className="explanation">
                                            {currentQuestion.explanation}
                                        </div>
                                    )}
                                    <div className="answer">
                                        {currentQuestion.type === 'slider' ? (
                                            <SliderInput
                                                label={currentQuestion.label || currentQuestion.question}
                                                min={currentQuestion.min}
                                                max={currentQuestion.max}
                                                value={Number(currentQuestion.field === 'weight' ? weight : height)}
                                                onChange={(e) => currentQuestion.field === 'weight' ? setWeight(Number(e.target.value)) : setHeight(Number(e.target.value))}
                                                unit={currentQuestion.unit}
                                                step={1}
                                            />
                                        ) : currentQuestion.type === 'date' ? (
                                            <DateInput
                                                selectedDate={birthDate}
                                                setSelectedDate={setBirthDate}
                                            />
                                        ) : (
                                            <>
                                                {currentQuestion.type === 'choice' ? (
                                                    currentQuestion.answers.map((answer, index) => (
                                                        <div key={index}>
                                                            <label>
                                                                <input type="radio" value={answer} {...register(currentQuestion.field)} defaultChecked={index === 0} /> {answer}
                                                            </label>
                                                        </div>
                                                    ))
                                                ) : currentQuestion.type === 'multipleChoice' ? (
                                                    currentQuestion.answers.map((answer, index) => (
                                                        <div key={index}>
                                                            <label>
                                                                <input type="checkbox" value={answer} {...register(currentQuestion.field)} /> {answer}
                                                            </label>
                                                        </div>
                                                    ))
                                                ) : (
                                                    currentQuestion.type === 'text' && currentQuestion.validation?.type === 'numeric' ? (
                                                        <input type="number" {...register(currentQuestion.field)} inputMode="numeric" />
                                                    ) : (
                                                        <input type={currentQuestion.type} {...register(currentQuestion.field)} />
                                                    )
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="button-group">
                                    {state.index > 0 && (
                                        <button type="button" onClick={handlePrevious} className="back">Anterior</button>
                                    )}
                                    {state.index < questions.length - 1 && !showFastingError && (
                                        <button type="button" onClick={handleNext} className="next">Siguiente</button>
                                    )}
                                    {state.index >= questions.length - 1 && (
                                        <button type="submit">Enviar</button>
                                    )}
                                </div>
                            </form>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppointmentForm;
