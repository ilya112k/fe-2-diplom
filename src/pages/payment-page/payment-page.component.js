import React from "react";

import FooterComponent from "../../components/footer/footer.component";
import OrderLineComponent from "../order-page/components/order-line/order-line.component";
import PaymentInfoComponent from "./components/payment-info/payment-info.component";
import HeaderOrderComponent from "../../components/header/header-order/header-order.component";
import OrderDetailsComponent from "../order-page/components/order-details/order-details.component";

function PaymentPageComponent() {
    return (
        <div className="payment-page">
            <HeaderOrderComponent />

            <main>
                <OrderLineComponent />
                <div className="order-container">
                    <div className="container">
                        <div className="order-content">
                            <aside className="order-sidebar">
                                <OrderDetailsComponent />
                            </aside>
                            <PaymentInfoComponent />
                        </div>
                    </div>
                </div>
            </main>

            <FooterComponent />
        </div>
    );
}

export default PaymentPageComponent;