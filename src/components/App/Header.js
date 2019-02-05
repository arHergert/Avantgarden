import React, {Component, Fragment} from 'react';
import leafLogo from "../../resources/img/header/leaf.png";

class Header extends Component {
    render() {
        return (
            <header>
                <div className={"header"}>
                    <span className={"title"}>
                        Avantgarden
                    </span>
                    <img className={"leaf-logo"} src={leafLogo}/>
                </div>
            </header>
        );
    }
}

export default Header;