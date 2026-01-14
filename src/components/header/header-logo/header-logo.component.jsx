import React from "react";
import { Link } from "react-router-dom";

import "./header-logo.component.css";

function HeaderLogoComponent() {

    return (
        <div className="header-logo">
            <div className="container">
                <Link to="/fe-diploma" className="header-logo__link" aria-label="Ссылка на главную">
                    <span>Лого</span>
                </Link>
            </div>
        </div>
    );
}

export default HeaderLogoComponent;