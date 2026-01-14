import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import ArrivalImage from "../../../../assets/slider-filter-period-arrival.png";
import DepartureImage from "../../../../assets/slider-filter-period-departure.png";

import "./seats-exchange.component.css";

function SeatsExchangeComponent({ data }) {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate("/fe-diploma/order");
    };

    const imageSource = data ? ArrivalImage : DepartureImage;
    const justifyContentStyle = data ? "flex-end" : "flex-start";

    return (
        <div className="seats__exchange" style={{ justifyContent: justifyContentStyle }}>
            <img className="seats__exchange-img" src={imageSource} alt={data ? "Прибытие" : "Отправление"} />
            <button className="seats__exchange-button" type="button" onClick={handleClick}>
                Выбрать другой поезд
            </button>
        </div>
    );
}

SeatsExchangeComponent.propTypes = {
    data: PropTypes.bool.isRequired,
};

export default SeatsExchangeComponent;