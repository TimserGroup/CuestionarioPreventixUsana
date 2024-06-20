import React from 'react';

function Options({question, dispatch, answer}) {
    // Maneja el cambio de respuestas
    const handleAnswerChange = (newAnswer) => {
        dispatch({type: 'ANSWER_QUESTION', payload: newAnswer});
    };

    // Si la pregunta es de tipo 'textarea', muestra un campo de texto para las
    // respuestas
    if (question.type === 'textarea') {
        return (
            <textarea
                value={answer || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
                className="textarea"
                placeholder="Escribe tu respuesta aquí..."/>
        );
    }

    // Si la pregunta es de tipo 'multiple', muestra las opciones múltiples
    return (
        <div className="options-container">
            {
                question
                    .answers
                    .map((option, index) => (
                        <button
                            key={index}
                            className={`btn-option ${answer === index
                                ? 'selected'
                                : ''}`}
                            onClick={() => handleAnswerChange(index)}>
                            {option}
                        </button>
                    ))
            }
        </div>
    );
}

export default Options;
