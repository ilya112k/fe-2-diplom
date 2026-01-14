import React from "react";

import {steps} from "../../../../data/steps";

import "./order-line.component.css";

function OrderLineComponent() {
    const path = window.location.pathname;

    const currentStepIndex = path.includes("passengers") ? 1 :
        path.includes("payment") ? 2 :
            path.includes("confirm") ? 3 : 0;

    const bgLine = { backgroundImage: `url(${steps[currentStepIndex].image})` };

    return (
        <div className={`order-line line ${path.includes("confirm") ? "order-line-all" : ""}`}>
            <div className="line__container">
                <ol className="line__list line__list-bg" style={bgLine}>
                    {steps && steps.map((step, index) => (
                        <li key={index} className="line__item">
                            <p className="line__title">
                                <span className="line__num">{index + 1}</span>
                                {step.title}
                            </p>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default OrderLineComponent;