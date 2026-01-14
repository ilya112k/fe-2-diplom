import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import OrderContext from "../../../../context/order/order-context";
import PaymentContext from "../../../../context/payment/payment-context";
import SVGIconComponent from "../../../../components/SVG-icon/SVG-icon.component";

import "./finish-info.component.css";

function FinishInfoComponent() {
    const { orderState } = useContext(OrderContext);
    const { payState } = useContext(PaymentContext);
    const navigate = useNavigate();

    const calculateTotalCost = (services, tickets) => {
        const serviceCost = Object.values(services).reduce((acc, item) => acc + +item, 0);
        const ticketCost = tickets ? tickets.reduce((acc, item) => acc + +item.seat_cost, 0) : 0;
        return serviceCost + ticketCost;
    };

    const totalDepartureCost = calculateTotalCost(orderState.departure_service, orderState.departure?.seats);
    const totalArrivalCost = calculateTotalCost(orderState.arrival_service, orderState.arrival?.seats);
    const totalCost = totalDepartureCost + totalArrivalCost;

    const handleHomeClick = (e) => {
        e.preventDefault();
        navigate("/fe-diploma");
    };

    return (
        <div className="finish-info__wrapper">
            <div className="finish-info__container">
                <p className="finish-info__title">Благодарим Вас за заказ!</p>
                <div className="finish-info__bg-wrapper">
                    <div className="finish-info__order-info">
                        <p>№ Заказа 285АА</p>
                        <p>
                            сумма<span className="finish-info__order-cost">{totalCost}</span>&#8381;
                        </p>
                    </div>

                    <div className="finish-info__tickets-info">
                        {["pc", "tickets", "driver"].map((icon, index) => (
                            <div className="finish-info__ticket-info" key={index}>
                                <SVGIconComponent name={icon} />
                                <p>
                                    {index === 0 && <>билеты будут<br />отправлены<br />на ваш <b>e-mail</b></>}
                                    {index === 1 && <> <b>распечатайте</b><br />и сохраняйте билеты<br />до даты поездки</>}
                                    {index === 2 && <> <b>предьявите</b><br />распечатанные<br />билеты при посадке</>}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="finish-info__appeal-info">
                        <p>{`${payState.user.first_name} ${payState.user.patronymic}!`}</p>
                        <p>Ваш заказ успешно оформлен.<br />В ближайшее время с вами свяжется наш оператор для подтверждения.</p>
                        <p>Благодарим Вас за оказанное доверие и желаем приятного путешествия!</p>
                    </div>

                    <div className="finish-info__service-rating">
                        <p className="service-rating__title">Оценить сервис</p>
                        <div className="service-rating__stars">
                            {Array.from({ length: 5 }, (_, index) => (
                                <div className="service-rating__star" key={index}></div>
                            ))}
                        </div>
                        <button className="service-rating__btn" type="button" onClick={handleHomeClick}>Вернуться на главную</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FinishInfoComponent;