import axios from "axios";
import React, {useState} from "react";
import {toast} from "react-toastify";

const MessageForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const handleMessage = async (e) => {
        e.preventDefault();
        try {
            await axios
                .post("https://webapitimser.azurewebsites.net/api/v1/message/send", {
                    firstName,
                    lastName,
                    email,
                    phone,
                    message
                }, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((res) => {
                    toast.success(res.data.message);
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setPhone("");
                    setMessage("");
                });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <> < div className = "container form-component message-form" > <h2>Comparte tus comentarios: quejas, sugerencias o preguntas</h2>
        <form onSubmit={handleMessage}>
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
            <textarea
                rows={7}
                placeholder="Mensaje..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}/>
            <div
                style={{
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <button type="submit">Enviar</button>
            </div>
        </form>
        <img src="/Vector.png" alt="vector"/>
    </div>
</>
    );
};

export default MessageForm;
