import React from "react";

import FooterComponent from "../../components/footer/footer.component";
import OrderLineComponent from "../order-page/components/order-line/order-line.component";
import HeaderOrderComponent from "../../components/header/header-order/header-order.component";
import ConfirmInfoComponent from "./components/confirm-info/confirm-info.component";
import OrderDetailsComponent from "../order-page/components/order-details/order-details.component";

function ConfirmPageComponent() {
    return (
        <>
            <HeaderOrderComponent />
            <OrderLineComponent />
            <div className="order-container">
                <div className="container">
                    <div className="order-content">
                        <OrderDetailsComponent className="order-sidebar" />
                        <ConfirmInfoComponent />
                    </div>
                </div>
            </div>
            <FooterComponent />
        </>
    );
}

export default ConfirmPageComponent;