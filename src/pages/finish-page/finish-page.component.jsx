import React from "react";

import Header from "../../components/header/header-finish/header-finish.component";
import FooterComponent from "../../components/footer/footer.component";
import FinishInfoComponent from "./components/finish-info/finish-info.component";

const FinishPageComponent = () => (
    <>
        <Header />
        <FinishInfoComponent />
        <FooterComponent />
    </>
);

export default FinishPageComponent;