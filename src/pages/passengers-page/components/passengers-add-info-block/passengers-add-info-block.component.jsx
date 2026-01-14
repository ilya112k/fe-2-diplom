import React from "react";
import PropTypes from "prop-types";

import "./passengers-add-info-block.component.css";

function PassengersAddInfoBlockComponent({ onChange }) {
    const handleAddBlock = (e) => {
        e.preventDefault();
        if (e.target) onChange(true);
    };


    return (
        <div className="passengers-add-info__wrapper">
            <div className="passengers-add-info__block">
                <p>Добавить пассажира</p>
                <button
                    className="passengers-add-info__btn"
                    type="button"
                    onClick={handleAddBlock}>
                </button>
            </div>
        </div>
    );
}

export default PassengersAddInfoBlockComponent;

PassengersAddInfoBlockComponent.propTypes = {
    onChange: PropTypes.func,
};