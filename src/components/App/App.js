import React, {Component, Fragment} from 'react';
import {BrowserRouter, Route, Link } from "react-router-dom";
import uuid from "uuid/v1";
import "./App.css";
import Header from "./Headers/Header";
import Home from "../pages/Home";
import Room from "../Home/Room";

/**
 * Main entrypoint for Avantgarden
 *
 * Controls the Lifecycle and administration off all
 * pages with reac-router
 */
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [
                {id: uuid(), name:"Test", currPerson: 4, maxPerson:6,  password: false},
                {id: uuid(), name:"KommDes Projekt - Flasche Designen", currPerson: 5, maxPerson:6, password: true},
                {id: uuid(), name:"Haus", currPerson: 1, maxPerson:5, password: false},
                {id: uuid(), name:"Fahrrad", currPerson: 2, maxPerson:5, password: true},
                {id: uuid(), name:"Auto", currPerson: 3, maxPerson:4, password: true}
            ]
        };

    }

    joinRoom = (id) => {
        console.log("Klick auf Raum '", id, "'");
    };

    newRoom = () => {
        console.log("NEW ROOM");
    };


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
                    {/* Hauptseite */}
                    <Route exact path="/" render={(props) =>
                        <Home
                            rooms={this.state.rooms}
                            joinRoom={this.joinRoom}
                            newRoom={this.newRoom}
                        /> }/>
                </Fragment>
            </BrowserRouter>

        )
    }

}//end App

export default App;
