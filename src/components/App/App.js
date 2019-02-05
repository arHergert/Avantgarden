import React, {Component, Fragment} from 'react';
import Axios from "axios";
import {BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Home from "../pages/Home";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    testLog =  () => {
        return "LALALALAL";
    };

    render() {
        return (
            <BrowserRouter>
                <Fragment>
                    <Header/>
                    <Route exact path="/" component={Home}/>
                </Fragment>
            </BrowserRouter>

        )
    }

}//end App

export default App;
