import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Header from "./Header";

import backImg from "@img/header/leaf.png";

class HeaderText extends Component {



    render() {
        return (
            <Fragment>
                <Header/>
                <div className={"header-text_left"}>{this.props.leftText}</div>
                <div className={"header-text_right"}>{this.props.rightText}</div>
            </Fragment>
        );
    }
}

HeaderText.propTypes = {
    rightText: PropTypes.string,
    leftText: PropTypes.string
};

export default HeaderText;
