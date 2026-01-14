import React, { useContext } from "react";
import PropTypes from "prop-types";

import TravelContext from "../../../../context/travel/travel-context";
import SVGIconComponent from "../../../../components/SVG-icon/SVG-icon.component";

import "./seats-train.component.css";

function SeatsTrainComponent({ data }) {
    const { routeState } = useContext(TravelContext);


    return (
        <div className="seats__about-train">

            <div className="seats__about-block">
                <div className="seats__about-icon">
                    <SVGIconComponent name={"train"} />
                </div>
                <div className="seats__about-train-block about-train">
                    <p className="about-train__number">{data === "departure" ? routeState.departure_train_name : routeState.arrival_train_name}</p>
                    {/* <p className="about-train__city">Адлер</p> */}
                    <p className="about-train__city">{data === "departure" ? routeState.departure_from_city_name : routeState.arrival_from_city_name}</p>
                    <p className="about-train__city">{data === "departure" ? routeState.departure_to_city_name : routeState.arrival_to_city_name}</p>
                </div>
            </div>

            <div className="seats__about-train-direction">
                <div>
                    <time dateTime="2001-05-15 19:00">{data === "departure" ? routeState.departure_from_datetime : routeState.arrival_from_datetime}</time>
                    <p>{data === "departure" ? routeState.departure_from_city_name : routeState.arrival_from_city_name}</p>
                    <p>{data === "departure" ? routeState.departure_from_railway_station_name : routeState.arrival_from_railway_station_name}</p>
                </div>
                <div>
                    <div className="train__time-arrow arrow-right"></div>
                </div>
                <div>
                    <time dateTime="2024-05-15 19:00">{data === "departure" ? routeState.departure_to_datetime : routeState.arrival_to_datetime}</time>
                    <p>{data === "departure" ? routeState.departure_to_city_name : routeState.arrival_to_city_name}</p>
                    <p>{data === "departure" ? routeState.departure_to_railway_station_name : routeState.arrival_to_railway_station_name}</p>
                </div>
            </div>

            <div className="seats__about-clock">
                <div className="seats__about-clock-icon clock-icon">
                    <SVGIconComponent name={"clock"} />
                </div>
                <p>
                    <span className="seats__about-clock-hour">{data === "departure" ? routeState.departure_duration.slice(-4, -3) : routeState.arrival_duration.slice(-4, -3)}</span> часа(ов) <br />
                    <span className="seats__about-clock-minute">{data === "departure" ? routeState.departure_duration.slice(-2, -1) : routeState.arrival_duration.slice(-2, -1)}</span> минут(ы)
                </p>
            </div>
        </div>
    );
}

export default SeatsTrainComponent;

SeatsTrainComponent.propTypes = {
    data: PropTypes.string.isRequired,
};