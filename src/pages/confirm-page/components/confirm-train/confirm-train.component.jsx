import React, { useContext } from "react";

import TravelContext from "../../../../context/travel/travel-context";
import SVGIconComponent from "../../../../components/SVG-icon/SVG-icon.component";

import "./confirm-train.component.css";

export const TrainInfo = ({ train }) => (
    <>
        <p className="confirm-train__name-number">{train.train_name}</p>
        <div className="confirm-train__name-place">
            <p className="confirm-train_name-city">{train.from_city}</p>
            <p className="confirm-train_name-city">{train.to_city}</p>
        </div>
    </>
);

export const TimeInfo = ({ time, city }) => (
    <div>
        <time dateTime={time.dateTime}>{time.datetime}</time>
        <p>{city.name}</p>
        <p>{city.station}</p>
    </div>
);

export const TripInfo = ({ route }) => (
    <div className="confirm-train_time-wrapper" style={{ height: route.arrival_id ? "360px" : "350px" }}>
        <div className="confirm-train_time-to" id={route.departure_id}>
            <TimeInfo time={{ datetime: route.departure_from_datetime }} city={{ name: route.departure_from_city_name, station: route.departure_from_railway_station_name }} />
            <div>
                <p>{route.departure_duration}</p>
                <div className="confirm-train_time-arrow arrow-right"></div>
            </div>
            <TimeInfo time={{ datetime: route.departure_to_datetime }} city={{ name: route.departure_to_city_name, station: route.departure_to_railway_station_name }} />
        </div>

        {route.arrival_id &&
            <div className="confirm-train_time-from" id={route.arrival_id}>
                <TimeInfo time={{ datetime: route.arrival_from_datetime }} city={{ name: route.arrival_from_city_name, station: route.arrival_from_railway_station_name }} />
                <div>
                    <p>{route.arrival_duration}</p>
                    <div className="confirm-train_time-arrow arrow-left"></div>
                </div>
                <TimeInfo time={{ datetime: route.arrival_to_datetime }} city={{ name: route.arrival_to_city_name, station: route.arrival_to_railway_station_name }} />
            </div>
        }
    </div>
);

export const PriceInfo = ({ seats }) => (
    <div className="confirm-train_price-seats">
        {(seats || [
            { type: "Сидячий", count: 88, price: 1920 },
            { type: "Плацкарт", count: 52, price: 2530 },
            { type: "Купе", count: 24, price: 3820 },
            { type: "Люкс", count: 15, price: 4950 },
        ]).map(seat => (
            <div className="confirm-train_price-seat" key={seat.type}>
                <p className="confirm-train_price-seat-type">{seat.type}</p>
                <p className="confirm-train_price-seat-count">{seat.count}</p>
                <p>от
                    <span className="confirm-train_price-seat-sum">{seat.price}</span>
                    <span className="confirm-train_price-seat-currency">&#8381;</span>
                </p>
            </div>
        ))}
    </div>
);

function ConfirmTrainComponent() {
    const { routeState } = useContext(TravelContext);

    const departureTrain = {
        train_name: routeState?.departure_train_name,
        from_city: routeState?.departure_from_city_name,
        to_city: routeState?.departure_to_city_name,
    };

    const arrivalTrain = routeState?.arrival_id ? {
        train_name: routeState?.arrival_train_name,
        from_city: routeState?.arrival_from_city_name,
        to_city: routeState?.arrival_to_city_name,
    } : null;

    return (
        <div className="order-train train">
            <div className="train__name-wrapper" style={{ height: routeState && routeState.arrival_id ? "360px" : "350px" }}>
                <div className="confirm-train_name-icon">
                    <SVGIconComponent name={"train"} />
                </div>
                <TrainInfo train={departureTrain} />
                {arrivalTrain && <TrainInfo train={arrivalTrain} />}
            </div>

            <TripInfo route={routeState} />

            <div className="train__price-wrapper" style={{ height: routeState && routeState.arrival_id ? "360px" : "350px" }}>
                <PriceInfo />
                <div className="train__price-icons">
                    <SVGIconComponent name={"have_air_conditioning"} />
                    <SVGIconComponent name={"have_wifi"} />
                    <SVGIconComponent name={"is_express"} />
                </div>
                <button className="confirm-info__btn" type="button">Изменить</button>
            </div>
        </div>
    );
}

export default ConfirmTrainComponent;