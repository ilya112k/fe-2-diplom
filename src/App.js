import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePageComponent from "./pages/home-page/home-page.component";
import OrderPageComponent from "./pages/order-page/order-page.component";
import SeatsPageComponent from "./pages/seats-page/seats-page.component";
import PassengersPageComponent from "./pages/passengers-page/passengers-page.component";
import PaymentPageComponent from "./pages/payment-page/payment-page.component.js";
import ConfirmPageComponent from "./pages/confirm-page/confirm-page.component";
import FinishPageComponent from "./pages/finish-page/finish-page.component";
import "./App.css";
import AppContext from "./context/app/app-context";
import TravelContext from "./context/travel/travel-context";
import OrderContext from "./context/order/order-context";
import PaymentContext from "./context/payment/payment-context";
import {initialAppState} from "./context/app/initial-app-state";
import {initialTravelState} from "./context/travel/initial-travel-state";
import {initialOrderState} from "./context/order/initial-order-state";
import {initialPaymentState} from "./context/payment/initial-payment-state";

function App() {
  const [appState, setAppState] = useState(initialAppState);
  const [routeState, setRouteState] = useState(initialTravelState);
  const [orderState, setOrderState] = useState(initialOrderState);
  const [payState, setPayState] = useState(initialPaymentState);

  return (
      <BrowserRouter>
        <div className="app">
          <AppContext.Provider value={{ appState, setAppState }}>
            <TravelContext.Provider value={{ routeState, setRouteState }}>
              <OrderContext.Provider value={{ orderState, setOrderState }}>
                <PaymentContext.Provider value={{ payState, setPayState }}>
                  <Routes>
                    <Route path="/fe-diploma" element={<HomePageComponent />} />
                    <Route path="/fe-diploma/order" element={<OrderPageComponent />} />
                    <Route path="/fe-diploma/order/seats" element={<SeatsPageComponent/>} />
                    <Route path="/fe-diploma/order/passengers" element={<PassengersPageComponent />} />
                    <Route path="/fe-diploma/order/payment" element={<PaymentPageComponent />} />
                    <Route path="/fe-diploma/order/confirm" element={<ConfirmPageComponent />} />
                    <Route path="/fe-diploma/finish" element={<FinishPageComponent />} />
                  </Routes>
                </PaymentContext.Provider>
              </OrderContext.Provider>
            </TravelContext.Provider>
          </AppContext.Provider>
        </div>
      </BrowserRouter>
  );
}

export default App;