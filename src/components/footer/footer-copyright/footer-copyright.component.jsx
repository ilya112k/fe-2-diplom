import React from "react";
import { Link } from "react-router-dom";

import "./footer-copyright.component.css";

function FooterCopyrightComponent() {
    const handlerScrollUp = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="footer-copyright copyright">
            <div className="container footer-copyright__container">
                <Link to="/" className="footer-copyright__logo-link" aria-label="Логотип">Лого</Link>
                <button
                    className="footer-copyright__top-btn"
                    type="button"
                    onClick={handlerScrollUp}
                    aria-label="Вернуться наверх"
                >
                    ↑
                </button>
                <p className="footer-copyright__info">© 2026 WEB</p>
            </div>
        </div>
    );
}

export default FooterCopyrightComponent;