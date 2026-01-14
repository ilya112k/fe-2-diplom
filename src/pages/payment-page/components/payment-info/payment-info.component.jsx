import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Validator from "validator";

import PaymentContext from "../../../../context/payment/payment-context";

import "./payment-info.component.css";

function PaymentInfoComponent() {
    const { payState, setPayState } = useContext(PaymentContext);
    const navigate = useNavigate();
    const formRefs = {
        lastName: useRef(),
        firstName: useRef(),
        patronymic: useRef(),
        phone: useRef(),
        email: useRef(),
        payOnline: useRef(),
        payCash: useRef(),
    };

    const checkFIO = (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-Zа-яА-Я]/gi, '');
    };

    const checkPhoneNumber = (e) => {
        e.target.value = e.target.value.replace(/[^\d]/g, '');
    };

    const checkEmail = (e) => {
        e.target.style.borderColor = Validator.isEmail(e.target.value) ? "" : "red";
    };

    const togglePaymentMethod = (isOnline) => {
        formRefs.payOnline.current.checked = isOnline;
        formRefs.payCash.current.checked = !isOnline;
    };

    const handleClick = (e) => {
        e.preventDefault();
        const values = {
            lastName: formRefs.lastName.current.value,
            firstName: formRefs.firstName.current.value,
            patronymic: formRefs.patronymic.current.value,
            phone: formRefs.phone.current.value,
            email: formRefs.email.current.value,
            paymentMethod: formRefs.payOnline.current.checked ? "online" : "cash",
        };

        if (values.firstName && values.lastName && values.phone && values.email) {
            setPayState({
                ...payState,
                user: {
                    first_name: values.firstName,
                    last_name: values.lastName,
                    patronymic: values.patronymic,
                    phone: values.phone,
                    email: values.email,
                    payment_method: values.paymentMethod,
                }
            });
            navigate("/fe-diploma/order/confirm");
        }
    };

    return (
        <div className="payment-info__wrapper">
            <div className="payment-info__personal-container">
                <div className="payment-info__personal-block">
                    <p className="payment-info__personal-title">Персональные данные</p>

                    <div className="payment-info__content">
                        <div className="info-block__personal-info">
                            <label htmlFor="second-name">Фамилия</label>
                            <input type="text" ref={formRefs.lastName} onInput={checkFIO} />
                        </div>

                        <div className="info-block__personal-info">
                            <label htmlFor="first-name">Имя</label>
                            <input type="text" ref={formRefs.firstName} onInput={checkFIO} />
                        </div>

                        <div className="info-block__personal-info">
                            <label htmlFor="third-name">Отчество</label>
                            <input type="text" ref={formRefs.patronymic} onInput={checkFIO} />
                        </div>

                        <div className="info-block__personal-info">
                            <label htmlFor="phone">Контактный телефон</label>
                            <input type="tel" ref={formRefs.phone} placeholder="+7" onInput={checkPhoneNumber} />
                        </div>

                        <div className="info-block__personal-info">
                            <label htmlFor="mail">E-mail</label>
                            <input type="email" ref={formRefs.email} placeholder="inbox@gmail.com" onInput={checkEmail} />
                        </div>
                    </div>
                </div>

                <div className="payment-info__pay-block">
                    <p className="payment-info__pay-title">Способ оплаты</p>
                    <div className="info-block__checkbox">
                        <input
                            className="personal__checkbox-input"
                            id="pay-online"
                            name="pay-online"
                            type="checkbox"
                            ref={formRefs.payOnline}
                            onChange={() => togglePaymentMethod(true)}
                        />
                        <label className="personal__checkbox-label" htmlFor="pay-online">Онлайн</label>
                    </div>
                    <div className="payment-info__pay-options">
                        <p>Банковской картой</p>
                        <p>PayPal</p>
                        <p>Visa QIWI Wallet</p>
                    </div>
                    <div className="info-block__checkbox">
                        <input
                            className="personal__checkbox-input"
                            id="pay-cash"
                            name="pay-cash"
                            type="checkbox"
                            ref={formRefs.payCash}
                            onChange={() => togglePaymentMethod(false)}
                        />
                        <label className="personal__checkbox-label" htmlFor="pay-cash">Наличными</label>
                    </div>
                </div>
            </div>

            <div className="payment-info__pay-btn">
                <button className="payment-info__btn" type="button" onClick={handleClick}>Купить билеты</button>
            </div>
        </div>
    );
}

export default PaymentInfoComponent;