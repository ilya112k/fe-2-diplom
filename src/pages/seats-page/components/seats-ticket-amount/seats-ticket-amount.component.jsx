import React, { useContext } from "react";

import OrderContext from "../../../../context/order/order-context";

import "./seats-ticket-amount.component.css";

function SeatsTicketAmountComponent() {
    const { orderState, setOrderState } = useContext(OrderContext);

    const handleInputValue = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        const container = e.target.closest(".seats__container");
        const isDeparture = container.dataset.name === "departure";
        const personCount = isDeparture ? orderState.departure_person_count : orderState.arrival_person_count;

        const sanitizedValue = Math.max(0, Math.min(name === "adult" ? 5 : name === "child" ? 3 : 5, parseInt(value) || 0));

        if (name === "adult" && personCount.child === 0 && personCount.baby === 0) {
            if (sanitizedValue > 0) {
                setOrderState((prevState) => ({
                    ...prevState,
                    [isDeparture ? "departure_person_count" : "arrival_person_count"]: {
                        ...personCount,
                        adult: sanitizedValue,
                        child: Math.max(0, Math.min(prevState[isDeparture ? "departure_person_count" : "arrival_person_count"].child, 0)),
                        baby: Math.max(0, Math.min(prevState[isDeparture ? "departure_person_count" : "arrival_person_count"].baby, 0)),
                    },
                }));
            }
        } else {
            setOrderState((prevState) => ({
                ...prevState,
                [isDeparture ? "departure_person_count" : "arrival_person_count"]: {
                    ...personCount,
                    [name]: sanitizedValue,
                },
            }));
        }
    };

    return (
        <div className="seats__ticket-amount ticket-amount">
            <p className="ticket-amount__title">Количество билетов</p>
            <form className="ticket-amount__form">
                {["adult", "child", "baby"].map((type) => (
                    <div className="ticket-amount__block" key={type}>
                        <label className="ticket-amount__input_label">
                            <div className="ticket-amount__input_text">
                                {type === "adult" ? "Взрослых — " : type === "child" ? "Детских — " : "Детских «без места» — "}
                            </div>
                            <input
                                className="ticket-amount__input"
                                name={type}
                                min="0"
                                max={type === "adult" ? "5" : type === "child" ? "3" : "5"}
                                type="number"
                                placeholder="0"
                                onChange={handleInputValue}
                            />
                        </label>
                        <div className="ticket-amount__block_description">
                            {type === "adult" && "Можно добавить 5 пассажиров"}
                            {type === "child" && "Можно добавить 3 детей до 10 лет. Свое место в вагоне, как у взрослых, но дешевле в среднем на 50-65%"}
                        </div>
                    </div>
                ))}
            </form>
        </div>
    );
}

export default SeatsTicketAmountComponent;