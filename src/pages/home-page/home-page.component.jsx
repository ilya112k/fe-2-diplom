import React from "react";

import FooterComponent from "../../components/footer/footer.component";
import MainWorkComponent from "./components/main-work/main-work.component";
import MainAboutComponent from "./components/main-about/main-about.component";
import HeaderStartComponent from "../../components/header/header-start/header-start.component";
import MainFeedbackComponent from "./components/main-feedback/main-feedback.component";

import "./home-page.component.css";

function HomePageComponent() {
    return (
        <>
            <HeaderStartComponent />
            <main className="main">
                <MainAboutComponent />
                <MainWorkComponent />
                <MainFeedbackComponent />
            </main>
            <FooterComponent />
        </>
    );
}

HomePageComponent.propTypes = {
};

export default React.memo(HomePageComponent);