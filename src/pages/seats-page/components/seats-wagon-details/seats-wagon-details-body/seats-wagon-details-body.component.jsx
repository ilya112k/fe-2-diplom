import React, { useContext } from "react";
import PropTypes from "prop-types";

import OrderContext from "../../../../../context/order/order-context";
import TooltipComponent from "../../../../../components/tooltip/tooltip.component";
import SVGIconComponent from "../../../../../components/SVG-icon/SVG-icon.component";

function SeatsWagonDetailsBodyComponent({ data, wagonType }) {
    const { orderState, setOrderState } = useContext(OrderContext);

    const chooseService = (e) => {
        const item = e.target.closest(".wagon-details__service-icon");
        if (item && item.className === "wagon-details__service-icon") {
            item.classList.add("wagon-details__service-icon-active");
        } else if (item && item.className === "wagon-details__service-icon wagon-details__service-icon-active") {
            item.classList.remove("wagon-details__service-icon-active");
        }

        const way = [...e.target.ownerDocument.querySelectorAll(".seats__container")];

        if (e.target.closest(".seats__container").dataset.name === "departure") {
            if (!way[0].querySelector(`.wagon-type__have_${wagonType}_class`).disabled) {
                if (item.className.includes("wagon-details__service-icon-active") && !item.className.includes("wagon-details__service-icon-include") && !item.className.includes("wagon-details__service-icon-exclude")) {
                    let cost = +e.target.closest(".wagon-details__service-item").dataset.cost;
                    setOrderState({
                        ...orderState,
                        departure_service: {
                            ...orderState.departure_service,
                            [`${wagonType}`]: +orderState.departure_service[`${wagonType}`] + cost,
                        }
                    })
                }
                if (!item.className.includes("wagon-details__service-icon-active") && !item.className.includes("wagon-details__service-icon-include") && !item.className.includes("wagon-details__service-icon-exclude")) {
                    let cost = +e.target.closest(".wagon-details__service-item").dataset.cost;
                    setOrderState({
                        ...orderState,
                        departure_service: {
                            ...orderState.departure_service,
                            [`${wagonType}`]: +orderState.departure_service[`${wagonType}`] - cost,
                        }
                    })
                }
            }

        } else {
            if (!way[1].querySelector(`.wagon-type__have_${wagonType}_class`).disabled) {
                if (item.className.includes("wagon-details__service-icon-active") && !item.className.includes("wagon-details__service-icon-include") && !item.className.includes("wagon-details__service-icon-exclude")) {
                    let cost = +e.target.closest(".wagon-details__service-item").dataset.cost;
                    setOrderState({
                        ...orderState,
                        arrival_service: {
                            ...orderState.arrival_service,
                            [`${wagonType}`]: +orderState.arrival_service[`${wagonType}`] + cost,
                        }
                    })
                }
                if (!item.className.includes("wagon-details__service-icon-active") && !item.className.includes("wagon-details__service-icon-include") && !item.className.includes("wagon-details__service-icon-exclude")) {
                    let cost = +e.target.closest(".wagon-details__service-item").dataset.cost;
                    setOrderState({
                        ...orderState,
                        arrival_service: {
                            ...orderState.arrival_service,
                            [`${wagonType}`]: +orderState.arrival_service[`${wagonType}`] - cost,
                        }
                    })
                }
            }
        }

    };


    return (
        <>
            <div className="wagon-details__number">
                <p className="wagon-number">{data.coach.name}</p>
                <p>вагон</p>
            </div>

            <div className="wagon-details__place">
                <p>Места <span className="wagon-details__place-count">{data.coach.available_seats}</span></p>
                {
                    wagonType === "fourth" ?
                        <>
                            <p>Верхние <span className="wagon-details__place-count"></span></p>
                            <p>Нижние <span className="wagon-details__place-count"></span></p>
                        </> :
                        wagonType === "third" ?
                            <>
                                <p>Верхние <span className="wagon-details__place-count"></span></p>
                                <p>Нижние <span className="wagon-details__place-count"></span></p>
                                <p>Боковые <span className="wagon-details__place-count"></span></p>
                            </> :
                            wagonType === "second" ?
                                <>
                                    <p>Верхние <span className="wagon-details__place-count"></span></p>
                                    <p>Нижние <span className="wagon-details__place-count"></span></p>
                                </> : ""
                }
            </div>

            <div className="wagon-details__price">
                <p>Стоимость</p>
                {
                    wagonType === "fourth" ?
                        <>
                            <p><span className="wagon-details__price-count">{data.coach.top_price}</span>&#8381;</p>
                            <p><span className="wagon-details__price-count">{data.coach.bottom_price}</span>&#8381;</p>
                        </> :
                        wagonType === "third" ?
                            <>
                                <p><span className="wagon-details__price-count">{data.coach.top_price}</span>&#8381;</p>
                                <p><span className="wagon-details__price-count">{data.coach.bottom_price}</span>&#8381;</p>
                                <p><span className="wagon-details__price-count">{data.coach.side_price}</span>&#8381;</p>
                            </> :
                            wagonType === "second" ?
                                <>
                                    <p><span className="wagon-details__price-count">{data.coach.top_price}</span>&#8381;</p>
                                    <p><span className="wagon-details__price-count">{data.coach.bottom_price}</span>&#8381;</p>
                                </> :
                                <p><span className="wagon-details__price-count">{data.coach.price}</span>&#8381;</p>
                }
            </div>

            <div className="wagon-details__service">
                <p>Обслуживание ФПК</p>
                <ul className="wagon-details__service-list">

                    <li className="wagon-details__service-item"
                        onClick={chooseService}
                        data-tooltip-id="have_air_conditioning"
                        data-tooltip-content={data.coach.have_air_conditioning ? "кондиционер работает" : "кондиционер отсутствует"}
                        data-tooltip-place="bottom">
                        <TooltipComponent id="have_air_conditioning" text="sdf"/>
                        <div
                            className={data.coach.have_air_conditioning ?
                                "wagon-details__service-icon wagon-details__service-icon-include" :
                                "wagon-details__service-icon wagon-details__service-icon-exclude"}>
                            <SVGIconComponent name={"have_air_conditioning"} />
                        </div>
                    </li>

                    <li className="wagon-details__service-item"
                        onClick={chooseService}
                        data-cost={data.coach.wifi_price ? data.coach.wifi_price : ""}
                        data-tooltip-id="have_wifi"
                        data-tooltip-content={data.coach.have_wifi ? `WI-FI, стоимость ${data.coach.wifi_price} ₽` : "WI-FI отсутствует"}
                        data-tooltip-place="bottom">
                        <TooltipComponent id="have_wifi" text="sadf"/>
                        <div
                            className={data.coach.have_wifi ?
                                "wagon-details__service-icon" :
                                "wagon-details__service-icon wagon-details__service-icon-exclude"}>
                            <SVGIconComponent name={"have_wifi"} />
                        </div>
                    </li>

                    <li className="wagon-details__service-item"
                        onClick={chooseService}
                        data-cost={data.coach.linens_price ? data.coach.linens_price : ""}
                        data-tooltip-id="have_bed_linen"
                        data-tooltip-content={data.coach.is_linens_included ? "белье включено в стоимость" : `белье, стоимость ${data.coach.linens_price} ₽`}
                        data-tooltip-place="bottom">
                        <TooltipComponent id="have_bed_linen" text="sdf"/>
                        <div
                            className={data.coach.is_linens_included ?
                                "wagon-details__service-icon wagon-details__service-icon-include" :
                                "wagon-details__service-icon"}>
                            <SVGIconComponent name={"have_bed_linen"} />
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default SeatsWagonDetailsBodyComponent;

SeatsWagonDetailsBodyComponent.propTypes = {
    data: PropTypes.object,
    wagonType: PropTypes.string,
};