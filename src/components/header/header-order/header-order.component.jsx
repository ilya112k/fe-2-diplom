import React from "react";

import bgImage from "../../../assets/header-order-image.png";
import HeaderNavComponent from "../header-nav/header-nav.component";
import HeaderLogoComponent from "../header-logo/header-logo.component";
import HeaderWidgetComponent from "../header-widget/header-widget.component";

import "./header-order.component.css";

function HeaderOrderComponent() {
    return (
        <header className="header-order" style={{ backgroundImage: `url(${bgImage})` }}>
            <HeaderLogoComponent />
            <HeaderNavComponent />
            <HeaderWidgetComponent />
        </header>
    );
}

export default HeaderOrderComponent;