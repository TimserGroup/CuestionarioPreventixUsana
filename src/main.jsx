import React from "react";
import ReactDOM from "react-dom/client";
import AppointmentForm from "./components/AppointmentForm";
import DateTimePicker from 'react-tailwindcss-datetimepicker';
import 'react-tailwindcss-datetimepicker/style.css';

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AppointmentForm />
    </React.StrictMode>
);
