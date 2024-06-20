import React from "react";
import {Link} from "react-router-dom";
import {FaLocationArrow, FaPhone} from "react-icons/fa6";
import {MdEmail} from "react-icons/md";

const Footer = () => {
    const hours = [
        {
            id: 1,
            day: "Lunes",
            time: "9:00 AM - 6:00 PM"
        }, {
            id: 2,
            day: "Martes",
            time: "9:00 AM - 6:00 PM"
        }, {
            id: 3,
            day: "Miercoles",
            time: "9:00 AM - 6:00 PM"
        }, {
            id: 4,
            day: "Jueves",
            time: "9:00 AM - 6:00 PM"
        }, {
            id: 5,
            day: "Viernes",
            time: "9:00 AM - 6:00 PM"
        }
    ];

    return (
        <> < footer className = {
            "container"
        } > <hr/>
        <div className="content">
            <div>
                <img src="/logo.png" alt="logo" className="logo-img"/>
            </div>
            <div>
                <h4>Links</h4>
                <ul>
                    <Link to={"/"}>Inicio</Link>
                    <Link to={"/appointment"}>Cuestionario</Link>
                    <Link to={"/about"}>Nosotros</Link>
                </ul>
            </div>
            <div>
                <h4>Horario Laboral</h4>
                <ul>
                    {
                        hours.map((element) => (
                            <li key={element.id}>
                                <span>{element.day}</span>
                                <span>{element.time}</span>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div>
                <h4>Contacto</h4>
                <div>
                    <FaPhone/>
                    <span>+52-558-987-20-20</span>
                </div>
                <div>
                    <MdEmail/>
                    <span>info@preventix.com</span>
                </div>
                <div>
                    <FaLocationArrow/>
                    <span>Periferico Sur 4349, Jardines en la Montaña, Tlalpan, 14210 Ciudad de
                        México, CDMX</span>
                </div>
            </div>
        </div>
    </footer>
</>
    );
};

export default Footer;
