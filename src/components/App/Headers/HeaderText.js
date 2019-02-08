import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Header from "./Header";

import backImg from "@img/header/leaf.png";

class HeaderText extends Component {
    render() {
        return (
            <Fragment>
                <Header/>
                <div className={"header-back"}>
                </div>
            </Fragment>
        );
    }
}

HeaderText.propTypes = {};

export default HeaderText;
