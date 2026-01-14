import React, { useState, useEffect } from "react";

import SVGIconComponent from "../../../../components/SVG-icon/SVG-icon.component";

import "./order-last-tickets.component.css";

function OrderLastTicketsComponent() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getResult = async () => {
            try {
                const response = await fetch("https://students.netoservices.ru/fe-diplom/routes/last");
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const result = await response.json();
                if (Array.isArray(result)) {
                    setData(result);
                } else {
                    console.error("Unexpected data format:", result);
                }
            } catch (e) {
                console.error("Fetch error:", e);
            }
        };
        getResult();
    }, []);

    return (
        <div className="order-last-tickets last-tickets">
            <p className="last-tickets__title">Последние билеты</p>
            <div className="last-tickets__wrapper">
                {data.length >= 0 ?
                    data.map(item => (
                        <div className="last-tickets__item ticket-item" key={item.departure._id}>
                            <div className="ticket-item__city">
                                <p className="ticket-item__from_city">{item.departure.from.city.name}</p>
                                <p className="ticket-item__to_city">{item.departure.to.city.name}</p>
                            </div>
                            <div className="ticket-item__railway">
                                <p className="ticket-item__from_railway">{item.departure.from.railway_station_name}</p>
                                <p className="ticket-item__to_railway">{item.departure.to.railway_station_name}</p>
                            </div>
                            <div className="ticket-item__options">
                                {['have_wifi', 'have_air_conditioning'].map(option => (
                                    item.departure[option] && (
                                        <div className="ticket-item__option" key={option}>
                                            <SVGIconComponent name={option} />
                                        </div>
                                    )
                                ))}
                            </div>
                            <p className="ticket-item__cost">
                                от
                                <span className="ticket-item__cost-value">{item.departure.min_price}</span>
                                <span className="ticket-item__cost-currency">&#8381;</span>
                            </p>
                        </div>
                    ))
                    : "Последние билеты не найдены"
                }
            </div>
        </div>
    );
}

export default OrderLastTicketsComponent;