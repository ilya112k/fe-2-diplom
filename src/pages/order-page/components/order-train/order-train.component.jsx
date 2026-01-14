import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import wifiIcon from '../../../../assets/wifi-icon.png';
import coffeeIcon from '../../../../assets/coffee-icon.png';
import expressIcon from '../../../../assets/express-icon.png';
import AppContext from "../../../../context/app/app-context";
import TravelContext from "../../../../context/travel/travel-context";
import {PriceInfo, TrainInfo, TripInfo} from "../../../confirm-page/components/confirm-train/confirm-train.component";

import "./order-train.component.css";

function OrderTrainComponent({ item }) {
    const { appState, setAppState } = useContext(AppContext);
    const { setRouteState } = useContext(TravelContext);

    const [newDate] = useState({
        date_start: appState.date_start,
        date_end: appState.date_end,
    });

    const [selectValue] = useState({
        from_city_name: appState.from_city_name,
        from_city_id: appState.from_city_id,
        to_city_name: appState.to_city_name,
        to_city_id: appState.to_city_id,
    });
    const [ loadApp,setLoadApp] = useState(false);
    const navigate = useNavigate();

    const routeState = {
        departure_id: item.departure?._id,
        departure_train_name: item.departure?.train.name,
        departure_from_city_name: item.departure?.from.city.name,
        departure_to_city_name: item.departure?.to.city.name,
        departure_from_datetime: new Date(item.departure?.from.datetime).toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        departure_from_railway_station_name: item.departure?.from.railway_station_name,
        departure_to_datetime: new Date(item.departure?.to.datetime).toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        departure_to_railway_station_name: item.departure?.to.railway_station_name,
        departure_duration: new Date(item.departure?.duration).toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        arrival_id: null,
        arrival_train_name: null,
        arrival_from_city_name: null,
        arrival_to_city_name: null,
        arrival_from_datetime: null,
        arrival_from_railway_station_name: null,
        arrival_to_datetime: null,
        arrival_to_railway_station_name: null,
        arrival_duration: null,
    }


    const handleClick = (e) => {
        e.preventDefault();
        setLoadApp(true)

        setRouteState((prevState) => ({
            ...prevState,
            ...routeState
        }))
        setAppState(prevState => ({
            ...prevState,
            departure_id: item?.departure?._id,
            arrival_id: item?.arrival?._id,
        }))
        navigate('/order/seats')
    }

    useEffect(() => {
        setAppState(prev => ({
            ...prev,
            date_start: newDate.date_start,
            date_end: newDate.date_end,
            from_city_name: selectValue.from_city_name,
            from_city_id: selectValue.from_city_id,
            to_city_name: selectValue.to_city_name,
            to_city_id: selectValue.to_city_id,
        }));
        setLoadApp(false);
    }, [newDate, selectValue, setAppState, setLoadApp, loadApp]);

    const departureTrain = {
        id: item.departure?._id,
        train_name: item.departure?.train.name,
        from_city: item.departure?.from.city.name,
        to_city: item.departure?.to.city.name
    }


    const seats = [];
    if (item.departure?.price_info?.first) {
        seats.push({ type: "Люкс", count: item.departure?.available_seats_info?.first, price: item.departure?.price_info?.first?.bottom_price })
    }

    if (item.departure?.price_info?.second) {
        seats.push({ type: "Купе", count: item.departure?.available_seats_info?.second, price: item.departure?.price_info?.second?.bottom_price })
    }

    if (item.departure?.price_info?.third) {
        seats.push({ type: "Плацкарт", count: item.departure?.available_seats_info?.third, price: item.departure?.price_info?.third?.bottom_price })
    }

    if (item.departure?.price_info?.fourth) {
        seats.push({ type: "Сидячий", count: item.departure?.available_seats_info?.fourth, price: item.departure?.price_info?.fourth?.bottom_price })
    }
    return (
        <>
            <div className="order-train train">
                <div className="train__name-wrapper"
                     style={{height: routeState && routeState.arrival_id ? "360px" : "350px"}}>
                    <div className="confirm-train_name-icon">

                    </div>
                    <TrainInfo train={departureTrain} key={departureTrain.id} />
                </div>

                <TripInfo route={routeState}/>

                <div className="train__price-wrapper"
                     style={{height: routeState && routeState.arrival_id ? "360px" : "350px"}}>
                    <PriceInfo seats={seats}/>
                    <div className="train__price-icons">
                        {item.have_wifi ? <img src={wifiIcon} alt="WI-FI"/> : ''}
                        {item.is_express ? <img src={expressIcon} alt="Expreess"/> : ''}
                        {item.have_air_conditioning ? <img src={coffeeIcon} alt="Coffee"/> : ''}
                    </div>
                    <button className="train__price-icons__ok-btn" type="button" onClick={handleClick}>подтвердить</button>
                </div>
            </div>
        </>

    );
}

export default OrderTrainComponent;