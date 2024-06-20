import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';

const DateInput = ({ selectedDate, setSelectedDate }) => {
    const handleChange = (newDate) => {
        setSelectedDate(newDate);
    };

    return (
        <div className="date-picker-wrapper">
            <DatePicker
                selected={selectedDate}
                onChange={handleChange}
                className="date-picker"
                dateFormat="dd/MM/yyyy"
                placeholderText="Selecciona una fecha"
                locale={es}
                showYearDropdown={true}
                showMonthDropdown={true}
                dropdownMode="select"
            />
        </div>
    );
};

export default DateInput;
