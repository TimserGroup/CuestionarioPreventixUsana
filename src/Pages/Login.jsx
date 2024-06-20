import axios from "axios";
import React, {useContext, useState} from "react";
import {toast} from "react-toastify";
import {Context} from "../main";
import {Link, useNavigate, Navigate} from "react-router-dom";

const Login = () => {
    const {isAuthenticated, setIsAuthenticated} = useContext(Context);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigateTo = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios
                .post("https://webapitimser.azurewebsites.net/api/v1/user/login", {
                    email,
                    password,
                    confirmPassword,
                    role: "Patient"
                }, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((res) => {
                    toast.success(res.data.message);
                    setIsAuthenticated(true);
                    navigateTo("/");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    if (isAuthenticated) {
        return <Navigate to={"/"}/>;
    }

    return (
        <> < div className = "container form-component login-form" > <h2>Inicia sesión</h2>

        <form onSubmit={handleLogin}>
            <input
                type="text"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            <input
                type="password"
                placeholder="Confirma contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}/>
            <div
                style={{
                    gap: "10px",
                    justifyContent: "flex-end",
                    flexDirection: "row"
                }}>
                <p style={{
                        marginBottom: 0
                    }}>¿Aún no te registras?</p>
                <Link
                    to={"/register"}
                    style={{
                        textDecoration: "none",
                        color: "#271776ca"
                    }}>
                    Regístrate
                </Link>
            </div>
            <div
                style={{
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <button type="submit">Iniciar sesión</button>
            </div>
        </form>
    </div>
</>
    );
};

export default Login;
