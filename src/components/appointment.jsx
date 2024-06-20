import React, {useState, useReducer} from 'react';
import './AppointmentForm.scss'; // Asegúrate de que el archivo SCSS esté correctamente importado.
import {questions, initialState, reducer} from './questionData'; // Importa las preguntas y el estado inicial del reducer.

const AppointmentForm = () => {
    const [formData, setFormData] = useState({});
    const [state, dispatch] = useReducer(reducer, initialState);

    const currentQuestion = questions[state.index];

    const handleChange = (event) => {
        const {name, value, type, checked} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === "checkbox"
                ? checked
                : value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes enviar los datos del formulario, formData, al servidor. Por
        // ejemplo, podrías enviarlos utilizando axios: axios.post('URL_DEL_ENDPOINT',
        // formData);
    };

    const handleNextQuestion = () => {
        dispatch({type: 'nextQuestion'});
    };

    return (
        <div className="appointment-page">
            <div className="container">
                <div className="center">
                    <form id="dynamic" onSubmit={handleSubmit}>
                        <div className="wrap">
                            <div className="question">{currentQuestion.question}</div>
                            <div className="answer">
                                {/* Renderiza el campo de entrada apropiado según el tipo de pregunta */}
                                {
                                    currentQuestion.type === 'choice'
                                        ? (
                                            <select
                                                name={currentQuestion.field}
                                                value={formData[currentQuestion.field]}
                                                onChange={handleChange}>
                                                {
                                                    currentQuestion
                                                        .answers
                                                        .map((answer, index) => (<option key={index} value={answer}>{answer}</option>))
                                                }
                                            </select>
                                        )
                                        : (
                                            <input
                                                type={currentQuestion.type}
                                                name={currentQuestion.field}
                                                value={formData[currentQuestion.field] || ''}
                                                onChange={handleChange}/>
                                        )
                                }
                                <button type="button" onClick={handleNextQuestion}>Next</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AppointmentForm;
