import React from "react";

import FooterContactComponent from "./footer-contact/footer-contact.component";
import FooterSubscribeComponent from "./footer-subscribe/footer-subscribe.component";
import FooterCopyrightComponent from "./footer-copyright/footer-copyright.component";

import "./footer.component.css";

function FooterComponent() {
    return (
        <footer className="footer" id="contacts">
            <div className="container footer-container">
                <FooterContactComponent />
                <FooterSubscribeComponent />
            </div>
            <div className="footer-decorate-line" />
            <FooterCopyrightComponent />
        </footer>
    );
}

FooterComponent.propTypes = {

};

export default FooterComponent;