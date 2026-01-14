import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AppContext from "../../../../context/app/app-context";
import OrderContext from "../../../../context/order/order-context";
import TravelContext from "../../../../context/travel/travel-context";
import PaymentContext from "../../../../context/payment/payment-context";
import ModalComponent from "../../../../components/modal/modal.component";
import SVGIconComponent from "../../../../components/SVG-icon/SVG-icon.component";
import postOrderService from "../../../../services/post-order.service";
import ConfirmTrainComponent from "../confirm-train/confirm-train.component";

import "./confirm-info.component.css";

function ConfirmInfoComponent() {
    const { setAppState } = useContext(AppContext);
    const { setTravelState } = useContext(TravelContext);
    const { orderState } = useContext(OrderContext);
    const { paymentState } = useContext(PaymentContext);
    const [check, setCheck] = useState(false);
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();

    const calculateTotalCost = () => {
        const serviceDepCost = Object.values(orderState.departure_service).reduce((acc, item) => acc + +item, 0);
        const serviceArrCost = Object.values(orderState.arrival_service).reduce((acc, item) => acc + +item, 0);
        const ticketsDepCost = orderState.departure?.seats?.reduce((acc, { seat_cost }) => acc + +seat_cost, 0) || 0;
        const ticketsArrCost = orderState.arrival?.seats?.reduce((acc, { seat_cost }) => acc + +seat_cost, 0) || 0;

        return serviceDepCost + serviceArrCost + ticketsDepCost + ticketsArrCost;
    };

    const totalCost = calculateTotalCost();
    const concatArray = [...paymentState.departure.seats, ...paymentState.arrival.seats];

    const handleModal = (value) => setModal(value);

    const modalInfo = (status) => (
        <ModalComponent
            status={status === "info" ? "info" : "error"}
            display={modal}
            text={status === "info" ? "Данные о поездке успешно отправлены" : "Ошибка! Сервер недоступен. Пожалуйста, попробуйте позже"}
            onChange={handleModal}
        />
    );

    const handleConfirmClick = (e) => {
        e.preventDefault();
        setCheck(true);
    };

    useEffect(() => {
        if (!check) return;

        postOrderService(paymentState)
            .then(() => {
                setModal(true);
                setTimeout(() => {
                    setModal(false);
                    setAppState({});
                    setTravelState({});
                    navigate("/finish");
                }, 1500);
            })
            .catch(() => {
                setModal(true);
            })
            .finally(() => setCheck(false));

    }, [check, navigate, paymentState, setAppState, setTravelState]);

    return (
        <div className="confirm-info_wrapper">
            <div className="confirm-info_block confirm-info_train-block">
                <p className="confirm-info_block-title">Поезд</p>
                <ConfirmTrainComponent />
            </div>

            <div className="confirm-info_block confirm-info_passengers-block">
                <p className="confirm-info_block-title">Пассажиры</p>
                <div className="confirm-info_passengers-container">
                    <div className="confirm-info_passengers-wrapper">
                        {concatArray && concatArray.map((item, i) => (
                            <div className="confirm-info__passenger" key={i}>
                                <div className="confirm-info_passenger-logo">
                                    <SVGIconComponent name={"person-in-circle"} />
                                    <p>{item.person_info.is_adult ? "Взрослый" : "Детский"}</p>
                                </div>
                                <div className="confirm-info_passenger-info">
                                    <p>{`${item.person_info.last_name} ${item.person_info.first_name} ${item.person_info.patronymic}`}</p>
                                    <p>{item.person_info.gender ? "Пол мужской" : "Пол женский"}</p>
                                    <p>{`Дата рождения ${item.person_info.birthday}`}</p>
                                    <p>{`${item.person_info.document_type} ${item.person_info.document_data}`}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="confirm-info_cost-wrapper">
                        <div className="confirm-info_total-cost">
                            <p>Всего</p>
                            <p><span className="confirm-info_cost">{totalCost}</span>&#8381;</p>
                        </div>
                        <button className="confirm-info__btn" type="button">Изменить</button>
                    </div>
                </div>
            </div>

            <div className="confirm-info_block confirm-info_payment-block">
                <p className="confirm-info_block-title">Способ оплаты</p>
                <div className="confirm-info_payment-wrapper">
                    <p className="confirm-info_payment-method">{paymentState.user.payment_method === "online" ? "Онлайн" : "Наличными"}</p>
                    <button className="confirm-info__btn" type="button">Изменить</button>
                </div>
            </div>

            <div className="confirm-info_ok-btn-wrapper">
                <button className="confirm-info_ok-btn" type="button" onClick={handleConfirmClick}>подтвердить</button>
            </div>

            {modalInfo(modal)}
        </div>
    );
}

export default ConfirmInfoComponent;