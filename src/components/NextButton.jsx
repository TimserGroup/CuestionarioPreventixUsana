import React from 'react';

function NextButton({dispatch, index, numQuestions}) {
    return (
        <button
            className="btn btn-ui"
            onClick={() => {
                if (index < numQuestions - 1) {
                    dispatch({type: 'nextQuestion'});
                } else if (index === numQuestions - 1) {
                    dispatch({type: 'finish'});
                }
            }}>
            {
                index < numQuestions - 1
                    ? 'Next'
                    : 'Finish'
            }
        </button>
    );
}

export default NextButton;
