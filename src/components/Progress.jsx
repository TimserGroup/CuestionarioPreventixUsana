function Progress({index, numQuestions, points, maxPossiblePoints, answer}) {
    return (
        <header className="progress">
            <progress max={numQuestions} value={index + Number(answer !== null)}/>
            <p>
                Pregunta
                <strong>{index + 1}</strong>
                / {numQuestions}
            </p>
            <p></p>
        </header>
    );
}

export default Progress;
