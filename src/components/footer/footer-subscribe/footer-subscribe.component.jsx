import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Validator from "validator";

import {socials} from "../../../data/socials";
import ModalComponent from "../../modal/modal.component";
import postSubscribeService from "../../../services/post-subscribe.service";

import "./footer-subscribe.component.css";

export default function FooterSubscribeComponent() {
    const [email, setEmail] = useState("");
    const [valid, setValid] = useState(false);
    const [modal, setModal] = useState(false);
    const [status, setStatus] = useState("");

    const handleEmail = (e) => {
        e.preventDefault();
        const isValid = Validator.isEmail(e.target.value);
        e.target.nextElementSibling.style.display = isValid ? "none" : "block";
        e.target.nextElementSibling.nextElementSibling.disabled = !isValid;
    };

    const handleClick = (e) => {
        e.preventDefault();
        const input = e.target.previousElementSibling.previousElementSibling;

        if (!input.value.trim()) return;
        setEmail(input.value);
        setValid(true);
        input.value = "";
    };

    const handleModal = (value) => setModal(value);

    const modalInfo = (value) => {
        return value && value === "info"
            ? <ModalComponent status={"info"} display={modal} text={"Вы успешно подписались на рассылку"} onChange={handleModal} />
            : <ModalComponent status={"error"} display={modal} text={"Ошибка! Сервер недоступен. Пожалуйста, попробуйте позже"} onChange={handleModal} />;
    };

    useEffect(() => {
        if (!valid) return;

        setStatus("");
        postSubscribeService(email)
            .then(data => {
                setStatus("info");
                setModal(true);
            })
            .catch(() => {
                setStatus("error");
                setModal(true);
            });

        setValid(false);
    }, [valid, email]);

    return (
        <div className="footer-subscribe subscribe">
            <p className="footer-subscribe__title">Подписка</p>
            <p className="footer-subscribe__subtitle">Будьте в курсе событий</p>
            <div className="footer-subscribe__form-wrapper">
                <form className="footer-subscribe__form">
                    <div className="footer-subscribe__form-content">
                        <input
                            className="footer-subscribe__input"
                            type="email"
                            name="email"
                            placeholder="e-mail"
                            onInput={handleEmail}
                            required
                        />
                        <span className="footer-subscribe__input-error">
                            Введите e-mail в формате example@site.com
                        </span>
                        <button className="footer-subscribe__button" onClick={handleClick}>Отправить</button>
                    </div>
                </form>
            </div>

            <div className="footer-subscribe__social">
                <p className="footer-subscribe__social-title">Подписывайтесь на нас</p>
                <ul className="footer-subscribe__social-list">
                    {socials && socials.map((item, i) => {
                        return (
                            <li className="subscribe__social-item" key={i}>
                                <Link to={item.href} target="_blank" className="subscribe__social-link">
                                    <img src={item.src} alt={item.alt} className="subscribe__social-image" />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            {modalInfo(status)} {}
        </div>
    );
}