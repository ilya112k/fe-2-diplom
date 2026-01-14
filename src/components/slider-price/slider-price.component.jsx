import React from "react";
import PropTypes from "prop-types";
import { Slider } from "antd";

import "./slider-price.component.css";


function SliderPriceComponent({ onChange }) {
    const marks = {
        0: "0",
        9999: "9999",
    }

    const onChangeComplete = (prices) => {
        const priceRange = {};
        priceRange["price_from"] = prices[0];
        priceRange["price_to"] = prices[1];
        onChange(priceRange);
    };


    return (
        <Slider
            range={{ draggableTrack: false }}
            tooltip={{ open: true }}
            defaultValue={[0, 9999]}
            step={10}
            min={0}
            max={9999}
            marks={marks}
            onChangeComplete={onChangeComplete}
        />
    );
}

export default SliderPriceComponent;

SliderPriceComponent.propTypes = {
    onChange: PropTypes.func,
};