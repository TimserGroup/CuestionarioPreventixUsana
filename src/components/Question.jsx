import React from 'react';
import Options from './Options';
import NextButton from './NextButton';

function Question({question, index, numQuestions, answer, dispatch}) {
    return (
        <div className="question-container">
            <h4>{question.question}</h4>
            <Options question={question} dispatch={dispatch} answer={answer}/> {/* Muestra el botón 'Siguiente' solo si se ha proporcionado una respuesta */}
            {
                answer !== null && (
                    <NextButton
                        dispatch={dispatch}
                        answer={answer}
                        index={index}
                        numQuestions={numQuestions}/>
                )
            }
        </div>
    );
}

export default Question;
