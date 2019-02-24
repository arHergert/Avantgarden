import React, {Component, Fragment} from 'react';
import {BrowserRouter, Route, withRouter } from "react-router-dom";
import axios from "axios";
import uuid from "uuid/v1";
import "./App.css";
import Home from "../pages/Home";
import CreateRoom from "../pages/CreateRoom";
import JoinRoom from "../pages/JoinRoom";
import Lobby from "../pages/Lobby";
import Draw from "../pages/Draw";

/**
 * Main entrypoint for Avantgarden
 *
 * Controls the Lifecycle and administration off all
 * pages with react-router
 */
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: uuid(),
            rooms: [
                {id: uuid(), name:"Test", currPerson: 4, maxPerson:6,  password: false},
                {id: uuid(), name:"KommDes Projekt - Flasche Designen", currPerson: 5, maxPerson:6, password: true},
                {id: uuid(), name:"Haus", currPerson: 1, maxPerson:5, password: false},
                {id: uuid(), name:"Fahrrad", currPerson: 2, maxPerson:5, password: true},
                {id: uuid(), name:"Auto", currPerson: 3, maxPerson:4, password: true},
                {id: uuid(), name:"Voller Raum", currPerson: 8, maxPerson:8, password: true}
            ],
        };

    }



    /**
     * <Browserrouter kümmert sich um das Weiterleiten zu verschiedenen
     * Pfaden/Pages.
     *
     * Besitz eine Page eine render-Methode, so muss sie auch die benötigten props
     * übergeben bekommen, ansonsten wird "component={<Component/>}" verwendet.
     *
     * Das Attribut "exact" sollte gesetzt werden, damit immer der genaue Pfad
     * ausgewählt wird.
     *
     * @example
     * Route ohne "exact":
     * Der User geht auf "/user/create"
     *
     * <Route path="/user" .../>
     * <Route path="/user/create" .../>
     * Ohne exact würde "/user" ausgewählt werden, da nur ein Teil des
     * Strings übereinstimmen muss.
     *
     * render übergeben:
     * <Route path="..." render={(props) => <Component beispielProp={...} />}
     */
    render() {

        return (
            <BrowserRouter>
                <Fragment>
                    {/* Mainpage */}
                    <Route exact path="/" render={(props) =>
                        <Home
                            rooms={this.state.rooms}
                            userid={this.state.id}
                        /> }/>

                    {/* Create new room */}
                    <Route exact path="/createroom" render={(props) =>
                        <CreateRoom redirectToHome={this.redirectToHome}/>
                    }/>

                    {/* Join a room */}
                    <Route exact path={"/joinroom"} render={(props) =>
                        <JoinRoom/>
                    }/>

                    {/* Lobby of room*/}
                    <Route exact path={"/lobby"} render={(props) =>
                        <Lobby/>
                    }/>
                    <Route exact path={"/draw"} render={(props) =>
                        <Draw/>
                    }/>
                </Fragment>
            </BrowserRouter>

        )
    }

}//end App

export default App;
