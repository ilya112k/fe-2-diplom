import React from "react";

import "./header-title.component.css";

function HeaderTitleComponent() {
    return (
        <div className="header-title-wrapper">
            <h1 className="header-title">
                Вся жизнь - <br />
                <span className="header-title_mod">путешествие!</span>
            </h1>
        </div>
    );
}

export default HeaderTitleComponent;