import React from "react";
import PropTypes from "prop-types";
import { Slider } from "antd";

import "./slider-period.component.css";

function SliderPeriodComponent({ data, name, onChange }) {
    const marks = {
        0: "0:00",
        24: "24:00",
    };

    const formatter = (value) => `${value}:00`;

    const onChangeSlider = (value) => {
        const obj = {
            [`${name}_hour_from`]: value[0],
            [`${name}_hour_to`]: value[1],
        };
        onChange(obj);
    };

    return (
        <Slider
            range
            tooltip={{ open: true, formatter }}
            value={[data.from, data.to]}
            step={1}
            min={0}
            max={24}
            marks={marks}
            onChange={onChangeSlider}
        />
    );
}

SliderPeriodComponent.propTypes = {
    data: PropTypes.shape({
        from: PropTypes.number.isRequired,
        to: PropTypes.number.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default SliderPeriodComponent;