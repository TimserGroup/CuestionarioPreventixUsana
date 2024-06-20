function StartScreen({numQuestions, dispatch}) {
    return (
        <div className="start">
            <h2>Bienvenida a Preventix</h2>
            <h3>La prueba más innovadora</h3>
            <button className="btn btn-ui" onClick={() => dispatch({type: "start"})}>
                Comienza el registro.
            </button>
        </div>
    );
}

export default StartScreen;
