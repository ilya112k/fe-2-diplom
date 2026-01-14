import React from "react";

import {works} from "../../../../data/works";

import "./main-work.component.css";

function MainWorkComponent() {
    return (
        <section className="main-work work" id="work">
            <div className="container">
                <div className="work__content-wrapper">
                    <h2 className="work__title">Как это работает</h2>
                    <div className="work__btn-wrapper">
                        <button className="work__btn">Узнать больше</button>
                    </div>
                    <div className="work__list">
                        {works && works.map((item, index) => (
                            <div className="work__item" key={index}>
                                <img src={item.src} alt={item.alt} />
                                <p className="work__item-text">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MainWorkComponent;