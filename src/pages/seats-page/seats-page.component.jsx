import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AppContext from "../../context/app/app-context";
import OrderContext from "../../context/order/order-context";
import ModalComponent from "../../components/modal/modal.component";
import FooterComponent from "../../components/footer/footer.component";
import useGetSeatsService from "../../services/use-get-seats.service";
import OrderLineComponent from "../order-page/components/order-line/order-line.component";
import HeaderOrderComponent from "../../components/header/header-order/header-order.component";
import OrderFiltersComponent from "../order-page/components/order-filters/order-filters.component";
import SeatsContainerComponent from "./components/seats-container/seats-container.component";
import OrderLastTicketsComponent from "../order-page/components/order-last-tickets/order-last-tickets.component";

import "./seats-page.component.css";

function SeatsPageComponent() {
    const { appState } = useContext(AppContext);
    const { orderState } = useContext(OrderContext);
    const { resultDeparture } = useGetSeatsService(appState, "departure");
    const { resultArrival } = useGetSeatsService(appState, "arrival");
    const [modal, setModal] = useState(false);
    const [close, setClose] = useState(false);
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate("/fe-diploma/order/passengers");
    };

    const handleModal = (value) => {
        setModal(value);
    };

    const setDisabled = () => {
        let boo;
        if (orderState.departure.route_direction_id && !orderState.arrival.route_direction_id) {
            boo = !(orderState.departure.seats && orderState.departure.seats.length);
        } else {
            boo = !(orderState.departure.seats && orderState.departure.seats.length) || !(orderState.arrival.seats && orderState.arrival.seats.length);
        }
        return boo;
    };

    useEffect(() => {
        if (close) return;
        if (!resultDeparture.isLoading && !resultArrival.isLoading) {
            if (appState.departure_id && !appState.arrival_id && resultDeparture.result.length) setModal(false);
            if (appState.departure_id && appState.arrival_id && resultDeparture.result.length) setModal(false);
            if (appState.departure_id && appState.arrival_id && !resultDeparture.result.length) setModal(true);
            if (appState.departure_id && !resultDeparture.result.length) setModal(true);
        }
        setClose(true);
    }, [appState, close, resultArrival, resultDeparture]);


    return (
        <>
            <HeaderOrderComponent />
            <OrderLineComponent />
            <div className="order-container">
                <div className="container">
                    <div className="order-content">
                        <aside className="order-sidebar">
                            <OrderFiltersComponent />
                            <OrderLastTicketsComponent />
                        </aside>
                        <main className="seats seats-wrapper">
                            <div>
                                <p className="seats-title">Выбор мест</p>
                                <SeatsContainerComponent />
                                <button className="seats-button" type="button" onClick={handleClick} disabled={setDisabled()}>далее</button>
                                <ModalComponent status={"error"} display={modal} text={resultArrival && resultArrival.result.error ? resultArrival.result.error : ""} onChange={handleModal} />
                            </div>
                        </main>
                    </div>
                </div>
            </div>
            <FooterComponent />
        </>
    );
}

export default SeatsPageComponent;