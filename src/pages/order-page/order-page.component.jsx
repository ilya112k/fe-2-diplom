import React from "react";

import FooterComponent from "../../components/footer/footer.component";
import OrderLineComponent from "./components/order-line/order-line.component";
import HeaderOrderComponent from "../../components/header/header-order/header-order.component";
import OrderContainerComponent from "./components/order-container/order-container.component";

import "./order-page.component.css";

function OrderPageComponent() {
    return (
        <>
            <HeaderOrderComponent />
            <main className="order-page order">
                <OrderLineComponent/>
                <OrderContainerComponent/>
            </main>
            <FooterComponent />
        </>
    );
}

export default OrderPageComponent;
