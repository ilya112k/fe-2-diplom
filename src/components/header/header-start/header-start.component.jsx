import React from "react";

import bgImage from "../../../assets/header-base-image.png";
import HeaderNavComponent from "../header-nav/header-nav.component";
import HeaderLogoComponent from "../header-logo/header-logo.component";
import HeaderTitleComponent from "../header-title/header-title.component";
import HeaderWidgetComponent from "../header-widget/header-widget.component";
import HeaderProgressBarComponent from "../header-progress-bar/header-progress-bar.component";

import "./header-start.component.css";

function HeaderStartComponent() {
    const startBg = {
        backgroundImage: `url(${bgImage})`,
    }

    return (
        <header className="header" style={startBg}>
            <HeaderLogoComponent />
            <HeaderNavComponent />
            <div className="header-widget container">
                <HeaderTitleComponent />
                <HeaderWidgetComponent />
            </div>
            <HeaderProgressBarComponent />
        </header>
    );
}

export default HeaderStartComponent;