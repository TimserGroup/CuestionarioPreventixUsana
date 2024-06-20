import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';

const HourInput = ({ selectedDate, setSelectedDate }) => {
    const [date, setDate] = useState(null);

    useEffect(() => {
        if (selectedDate) {
            setDate(new Date(selectedDate));
        }
    }, [selectedDate]);

    const handleChange = (date) => {
        setDate(date);
        setSelectedDate(date.toISOString());
    };

    return (
        <div className="date-picker-wrapper">
            <DatePicker
                selected={date}
                onChange={handleChange}
                className="date-picker"
                dateFormat="dd/MM/yyyy HH:mm"
                placeholderText="Selecciona una hora"
                locale={es}
                showTimeSelect
                timeIntervals={30}
                timeFormat="HH:mm"
                timeCaption="Hora"
            />
        </div>
    );
};

export default HourInput;
