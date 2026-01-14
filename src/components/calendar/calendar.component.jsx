import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import AirDatepicker from "air-datepicker";

import "air-datepicker/air-datepicker.css";
import "./calendar.component.css";

function CalendarComponent({ name, placeholder, onChange }) {
    const inputRef = useRef(null);
    const datepickerRef = useRef(null);

    useEffect(() => {
        if (!inputRef.current) return;

        datepickerRef.current = new AirDatepicker(inputRef.current, {
            dateFormat(date) {
                const formatted = date.toLocaleString("ru-RU", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                });

                return `${formatted.slice(6)}-${formatted.slice(3, 5)}-${formatted.slice(0, 2)}`;
            },
            navTitles: {
                days: "MMMM",
            },
            onSelect({ date }) {
                if (!date) return;

                const formatted = date.toLocaleString("ru-RU", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                });

                const value = `${formatted.slice(6)}-${formatted.slice(3, 5)}-${formatted.slice(0, 2)}`;

                onChange({
                    [name]: value,
                });
            },
        });

        return () => {
            datepickerRef.current?.destroy();
            datepickerRef.current = null;
        };
    }, [name, onChange]);

    return (
        <input
            ref={inputRef}
            placeholder={placeholder}
            className={`fieldset__input ${name}`}
            required
        />
    );
}

CalendarComponent.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default CalendarComponent;