import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AppContext from "../../../context/app/app-context";
import ModalComponent from "../../modal/modal.component";
import CalendarComponent from "../../calendar/calendar.component";
import SelectLocationComponent from "../../select-location/select-location.component";

import "./header-widget.component.css";

function HeaderWidgetComponent() {
    const { appState, setAppState } = useContext(AppContext);
    const [dateRange, setDateRange] = useState({
        date_start: appState.date_start,
        date_end: appState.date_end,
    });
    const [citiesDuration, setCitiesDuration] = useState({
        from_city_name: appState.from_city_name,
        from_city_id: appState.from_city_id,
        to_city_name: appState.to_city_name,
        to_city_id: appState.to_city_id,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const cityFrom = e.target.parentElement.parentElement.querySelector(".fieldset__input-from .ant-select-content-value");
        const cityTo = e.target.parentElement.parentElement.querySelector(".fieldset__input-to .ant-select-content-value");

        if (!cityFrom || !cityTo) {
            setModal(true);
        } else if ((cityFrom && !cityFrom.title) || (cityTo && !cityTo.title)) {
            setModal(true);
        } else {
            navigate("/fe-diploma/order");
        }
    };

    const getCityChange = (e) => {
        e.preventDefault();
        const cityFrom = e.target.parentElement.parentElement.querySelector(".fieldset__input-from .ant-select-location-selection-item");
        const cityTo = e.target.parentElement.parentElement.querySelector(".fieldset__input-to .ant-select-location-selection-item");

        if (!cityFrom || !cityTo) {
            setModal(true);
        } else if ((cityFrom && !cityFrom.title) || (cityTo && !cityTo.title)) {
            setModal(true);
        } else if (!citiesDuration.from_city_name || !citiesDuration.to_city_name) {
            setModal(true);
        } else {
            handleSelectValue({
                from_city_name: citiesDuration.to_city_name,
                from_city_id: citiesDuration.to_city_id,
                to_city_name: citiesDuration.from_city_name,
                to_city_id: citiesDuration.from_city_id,
            });

            const from = cityFrom.textContent;
            const to = cityTo.textContent;
            cityFrom.textContent = to;
            cityFrom.title = to;
            cityTo.textContent = from;
            cityTo.title = from;
            setIsLoading(true);
        }
    };

    const handleSelectValue = (value) => {
        if (!value) return;
        setCitiesDuration({
            ...citiesDuration,
            ...value,
        });
        setIsLoading(true);
    };

    const handleModal = (value) => setModal(value);

    const changeDate = (value) => {
        if (!value) return;
        setDateRange({
            ...dateRange,
            ...value,
        });
        setIsLoading(true);
    };

    useEffect(() => {
        if (!isLoading) return;
        setAppState({
            ...appState,
            date_start: dateRange.date_start,
            date_end: dateRange.date_end,
            from_city_name: citiesDuration.from_city_name,
            from_city_id: citiesDuration.from_city_id,
            to_city_name: citiesDuration.to_city_name,
            to_city_id: citiesDuration.to_city_id,
        });
        setIsLoading(false);
    }, [appState, isLoading, dateRange, citiesDuration, setAppState]);


    return (
        <div className="search-widget">
            <form className="search-widget__form form">
                <fieldset className="form__fieldset fieldset fieldset-direction">
                    <legend className="fieldset__legend">Направление</legend>
                    <div className="fieldset__input-wrapper">
                        <label className="fieldset__label" />
                        <SelectLocationComponent name={"fieldset__input-from"}
                                                 placeholder={appState.from_city_name ? appState.from_city_name : "Откуда"}
                                                 onValue={handleSelectValue}
                        />
                    </div>
                    <div className="fieldset__btn">
                        <button className="fieldset-direction__btn" type="button" onClick={getCityChange} />
                    </div>
                    <div className="fieldset__input-wrapper">
                        <label htmlFor="to" className="fieldset__label" />
                        <SelectLocationComponent name={"fieldset__input-to"}
                                                 placeholder={appState.to_city_name ? appState.to_city_name : "Куда"}
                                                 onValue={handleSelectValue}
                        />
                    </div>
                </fieldset>

                <fieldset className="form__fieldset fieldset fieldset-date">
                    <legend className="fieldset__legend">Дата</legend>
                    <div className="fieldset__input-wrapper">
                        <label className="fieldset__label" />
                        <CalendarComponent name={"date_start"}
                                           placeholder={appState.date_start ? appState.date_start : "ДД/ММ/ГГ"}
                                           onChange={changeDate}
                        />
                    </div>
                    <div className="fieldset__input-wrapper">
                        <label className="fieldset__label" />
                        <CalendarComponent name={"date_end"}
                                           placeholder={appState.date_end ? appState.date_end : "ДД/ММ/ГГ"}
                                           onChange={changeDate}
                        />
                    </div>
                </fieldset>

                <div className="form__btn">
                    <button className="form__btn-send" type="button" onClick={handleClick}>Найти билеты</button>
                </div>
            </form>

             <ModalComponent status={"info"} display={modal} text={`Поля "Откуда" и "Куда" обязательны для заполнения`} onChange={handleModal} />
        </div>
    );
}

export default HeaderWidgetComponent;