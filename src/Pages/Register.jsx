import axios from "axios";
import React, {useContext, useState} from "react";
import {toast} from "react-toastify";
import {Context} from "../main";
import {Link, Navigate, useNavigate} from "react-router-dom";

const Register = () => {
    const {isAuthenticated, setIsAuthenticated} = useContext(Context);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");

    const navigateTo = useNavigate();

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "https://webapitimser.azurewebsites.net/api/v1/user/patient/register",
                {
                    firstName,
                    lastName,
                    email,
                    phone,
                    dob,
                    gender,
                    password
                },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response && response.data) {
                toast.success(response.data.message);
                setIsAuthenticated(true);
                navigateTo("/");
                setFirstName("");
                setLastName("");
                setEmail("");
                setPhone("");
                setNic("");
                setDob("");
                setGender("");
                setPassword("");
            } else {
                // Manejar el caso en que la respuesta no contiene datos
                toast.error("Error: No se recibieron datos en la respuesta");
            }
        } catch (error) {
            // Manejar errores de la solicitud
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Error: Algo salió mal al procesar la solicitud");
            }
        }
    };

    if (isAuthenticated) {
        return <Navigate to={"/"}/>;
    }

    return (
        <> < div className = "container form-component register-form" > <h2>Registrate</h2>
        <p>Registrate para continuar.</p>

        <form onSubmit={handleRegistration}>
            <div>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}/>
                <input
                    type="text"
                    placeholder="Apellido"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}/>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                <input
                    type="number"
                    placeholder="Teléfono"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}/>
            </div>
            <div>

                <input
                    type={"date"}
                    placeholder="Fecha de nacimiento"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}/>
            </div>
            <div>
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="">Selecciona género</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                </select>
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div
                style={{
                    gap: "10px",
                    justifyContent: "flex-end",
                    flexDirection: "row"
                }}>
                <p style={{
                        marginBottom: 0
                    }}>¿Ya estás registrado?</p>
                <Link
                    to={"/signin"}
                    style={{
                        textDecoration: "none",
                        color: "#271776ca"
                    }}>
                    Iniciar sesión
                </Link>
            </div>
            <div
                style={{
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <button type="submit">Registrar</button>
            </div>
        </form>
    </div>
</>
    );
};

export default Register;
