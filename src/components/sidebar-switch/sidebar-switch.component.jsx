import React from "react";
import PropTypes from "prop-types";
import { Switch } from "antd";

import "./sidebar-switch.component.css";

function SidebarSwitchComponent({ name, onChange }) {
    const handleClick = (value) => {
        onChange({ [name]: value });
    };

    return (
        <Switch className="switch__btn" data-name={name} onChange={handleClick} />
    );
}

SidebarSwitchComponent.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default SidebarSwitchComponent;