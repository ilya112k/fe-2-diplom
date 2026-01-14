import React from "react";
import { Link } from "react-router-dom";

import {contacts} from "../../../data/contacts";

import "./footer-contact.component.css";

function FooterContactItem({ item }) {
    return (
        <li className="footer-contact__list-item">
            <Link to={item.href} target="_blank" className="footer-contact__list-link">
                <img src={item.src} alt={item.alt} className="footer-contact__list-image" />
                <p className="footer-contact__list-desc">{item.desc}</p>
            </Link>
        </li>
    );
}

function FooterContactComponent() {
    return (
        <div className="footer-contact contact">
            <p className="footer-contact__title">Свяжитесь с нами</p>
            <ul className="footer-contact__list">
                {contacts && contacts.map((item) => (
                    <FooterContactItem key={item.id} item={item} />
                ))}
            </ul>
        </div>
    );
}

export default FooterContactComponent;