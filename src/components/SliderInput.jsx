import React, { useState, useEffect } from 'react';
import './SliderInput.scss';

const SliderInput = ({
    label,
    min,
    max,
    value,
    onChange,
    unit,
    step = 1 // Add a default step value
}) => {
    const [inputValue, setInputValue] = useState(Number(value));
    const [focus, setFocus] = useState(false); // State to manage focus style

    useEffect(() => {
        setInputValue(Number(value));
    }, [value]);

    const formatValue = (value) => {
        if (isNaN(value)) {
            return '';
        }
        if (unit === 'm') {
            const meters = Math.floor(value / 100);
            const centimeters = value % 100;
            return `${meters}m ${centimeters}cm`; // e.g., 1m 70cm
        }
        return `${value.toFixed(2)} ${unit}`; // Display value with two decimal places
    };

    const handleFocus = () => {
        setFocus(true); // Set focus to true when user interacts with the slider
    };

    const handleBlur = () => {
        setFocus(false); // Remove focus when user stops interacting
    };

    const handleInputChange = (e) => {
        const newValue = parseFloat(e.target.value);
        if (!isNaN(newValue) && newValue >= min && newValue <= max) {
            setInputValue(newValue);
            onChange({ target: { value: newValue } });
        }
    };

    const handleSliderChange = (e) => {
        const newValue = parseFloat(e.target.value);
        setInputValue(newValue);
        onChange(e);
    };

    const handleIncrease = () => {
        let newValue = parseFloat(inputValue) + step;
        if (newValue <= max) {
            setInputValue(newValue);
            onChange({ target: { value: newValue.toString() } });
        }
    };

    const handleDecrease = () => {
        let newValue = parseFloat(inputValue) - step;
        if (newValue >= min) {
            setInputValue(newValue);
            onChange({ target: { value: newValue.toString() } });
        }
    };

    return (
        <div className="slider-container">
            <label htmlFor="slider">{label}: {formatValue(inputValue)}</label>
            <div className="slider-wrapper">
                <button type="button" onClick={handleDecrease} className="slider-button">-</button>
                <input
                    id="slider"
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={inputValue}
                    onChange={handleSliderChange}
                    onMouseDown={handleFocus}
                    onMouseUp={handleBlur}
                    onTouchStart={handleFocus}
                    onTouchEnd={handleBlur}
                    className="slider"
                />
                <button type="button" onClick={handleIncrease} className="slider-button">+</button>
            </div>
            <div className="value-display">
                {formatValue(inputValue)}
            </div>
        </div>
    );
};

export default SliderInput;
