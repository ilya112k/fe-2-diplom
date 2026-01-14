import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import FooterComponent from "../../components/footer/footer.component";
import OrderLineComponent from "../order-page/components/order-line/order-line.component";
import HeaderOrderComponent from "../../components/header/header-order/header-order.component";
import OrderDetailsComponent from "../order-page/components/order-details/order-details.component";
import PassengersInfoComponent from "./components/passengers-info/passengers-info.component";

function PassengersPageComponent() {
    const [passengerData, setPassengerData] = useState([]);

    useEffect(() => {
        const fetchPassengerData = async () => {
            const data = await fetch("/api/passengers");
            const result = await data.json();
            setPassengerData(result);
        };

        fetchPassengerData();
    }, []);

    return (
        <>
            <HeaderOrderComponent />
            <OrderLineComponent />
            <div className="order-container">
                <div className="container">
                    <div className="order-content">
                        <div className="order-sidebar">
                            <OrderDetailsComponent />
                        </div>
                        <PassengersInfoComponent passengers={passengerData} />
                    </div>
                </div>
            </div>
            <FooterComponent />
        </>
    );
}

PassengersPageComponent.propTypes = {
    passengers: PropTypes.array,
};

export default PassengersPageComponent;