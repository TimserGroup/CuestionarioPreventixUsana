import React from "react";

const Biography = ({imageUrl}) => {
    return (
        <> < div className = "container biography" > <img
            className="logop"
            src={'https://preventix.global/wp-content/uploads/2021/05/Logo-Preventix-300x145.png'}
            alt="Preventix"/>
        <div className="banner">
            
        </div>
        <div className="banner">
            <p>Preventix</p>
            <h3>¿Quienés somos?</h3>
            <p>
            Preventix es una prueba patentada a nivel mundial que mide biomarcadores proteicos en la sangre.
            </p>
            <p>Con Preventix podemos prevenir</p>
            <p>
            ¿Sabías que los biomarcadores son parte de las nuevas tecnologías utilizadas en la medicina de precisión?

 

</p>
            <p>
            Su uso contribuye a tener mas herramientas para el cuidado de la salud.
            </p>

        </div>
    </div>
</>
    );
};

export default Biography;
