import React from "react";

import bgImage from "../../../assets/header-order-image.png";
import HeaderNavComponent from "../header-nav/header-nav.component";
import HeaderLogoComponent from "../header-logo/header-logo.component";

import "./header-finish.component.css";


function HeaderFinishComponent() {
    const startBg = {
        backgroundImage: `url(${bgImage})`,
    }

    return (
        <header className="header-finish" style={startBg}>
            <HeaderLogoComponent />
            <HeaderNavComponent />
        </header>
    );
}

export default HeaderFinishComponent;