import React from "react";
import { HashLink } from "react-router-hash-link";

import {headerNav} from "../../../data/header-nav";

import "./header-nav.component.css";

function HeaderNavComponent() {
    return (
        <div className="header-nav">
            <div className="container">
                <nav className="header-nav__nav nav">
                    <ul className="header-nav__list">
                        { headerNav.map((item, i) => {
                            return (
                                <li className="nav__item" key={i}>
                                    <HashLink
                                        to={item.url}
                                        className="nav__link"
                                        activeClassName="nav__link--active"
                                    >
                                        {item.text}
                                    </HashLink>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default HeaderNavComponent;