import React, {Component, Fragment} from 'react';
import Header from "../App/Headers/Header";
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import timerImg from "@img/rooms/baseline_timer_black_18dp.png";
import axios from "axios";
import ip from "../ipConfig";


class CreateRoom extends Component {

    state = {
        roomname: "",
        nickname: "",
        maxPerson: "",
        mainTopic: "",
        password: "",
        timer: "",
        roomnameError: false,
        nicknameError: false,
        maxPersonError: false,
        roomId: null,
        userId: null


    };

    onSubmit = (event) => {
        let errorOccured= false;
        event.preventDefault();

        if(this.state.roomname === ""){
            this.setState({roomnameError: "Bitte einen Raumnamen vergeben!"});
            errorOccured = true;
        }else {
            this.setState({roomnameError: null});
            errorOccured = false;
        }

        if(this.state.maxPerson === "" || this.state.maxPerson <= 2 || this.state.maxPerson >= 8 ){
            this.setState({maxPersonError: "Bitte Zahl zwischen 2 und 8 angeben!"});
            errorOccured = true;
        }else {
            this.setState({maxPersonError: null});
            errorOccured = false;
        }

        if(this.state.nickname === ""){
            this.setState({nicknameError: "Bitte Namen eingeben!"});
            errorOccured = true;
        }else {
            this.setState({nicknameError: null});
            errorOccured = false;
        }

        if(this.state.password === "") this.state.password = null;
        if(this.state.timer === "") this.state.timer = 120;
        if(this.state.mainTopic === "") this.state.mainTopic = null;

        console.log("Axios?", errorOccured);
        if(!errorOccured){

            //Raum erstellen
            //POST api/rooms
            axios.post(`${ip.client}/api/rooms`,
                {
                    name: this.state.roomname,
                    maxPerson: this.state.maxPerson ,
                    password: this.state.password ,
                    timer: this.state.timer,
                    mainTopic: this.state.mainTopic
                })
                .then(res => this.state.roomId = res.data)
                .then( () => {

                    //Aktuellen User in den Raum hinzufügen
                    axios.post(`${ip.client}/api/rooms/${this.state.roomId}/users`, {name: this.state.nickname, adminStatus: true })
                    .then(res => this.state.userId = res.data)
                    .then(() => {
                        console.log("Room ID:", this.state.roomId, " - UserId:", this.state.userId);
                        //User in Raum schicken und als Admin setzen
                        this.props.history.push({
                            pathname: "/lobby",
                            roomid: this.state.roomId,
                            userid: this.state.userId
                        });
                    }
                    )
                    .catch(err => console.error(err))

                })
                .catch(err => console.error(err));

        }
    };

    redirectToHome = () => {
        this.props.history.push("/");
    };

    handleInputChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        return (
            <Fragment>
                <Header/>
                <article className={"mainsec"}>
                    <div className={"room-title"}>Raum erstellen</div>
                    <div className={"room-form"}>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input
                                    required={true}
                                    type="input"
                                    className={"form-control"}
                                    onChange={this.handleInputChange}
                                    id="roomname"
                                    name={"roomname"}
                                    placeholder="Raumnamen festlegen *"
                                />
                                <div className="invalid-feedback d-block">
                                    {this.state.roomnameError}
                                </div>
                            </div>
                            <div className="form-group">
                                <input
                                    required={true}
                                    type="input"
                                    className={"form-control"}
                                    onChange={this.handleInputChange}
                                    id="creatorname"
                                    name={"nickname"}
                                    placeholder="Dein Nickname *"
                                />
                                <div className="invalid-feedback d-block">
                                    {this.state.nicknameError}
                                </div>
                            </div>
                            <div className="form-group">
                                <input
                                    required={true}
                                    type="number"
                                    className={"form-control"}
                                    onChange={this.handleInputChange}
                                    id="maxPers"
                                    name={"maxPerson"}
                                    min="2"
                                    max="8"
                                    placeholder="Anzahl max. Personen *"
                                />
                                <div className="invalid-feedback d-block">
                                    {this.state.maxPersonError}
                                </div>
                            </div>
                            <div className="form-group">
                                <input
                                    type="input"
                                    className={"form-control"}
                                    onChange={this.handleInputChange}
                                    id="theme"
                                    name={"mainTopic"}
                                    placeholder="Vorgegebenes Oberthema?"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="input"
                                    className={"form-control"}
                                    onChange={this.handleInputChange}
                                    id="password"
                                    name={"password"}
                                    placeholder="Passwort?"
                                />
                            </div>
                            <div className="form-group row room-form_timer">
                                <img className={"room-form_timer_icon"} src={timerImg}/>
                                <label
                                    className="room-form_label_text">
                                    Zeit zum Malen
                                </label>
                                <div className="room-form_inputmini">
                                    <input type="number"
                                           className="form-control"
                                           onChange={this.handleInputChange}
                                           id="starttime"
                                           name={"timer"}
                                           min="120"
                                           max="9999"
                                           placeholder="120 Sekunden"
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={this.onSubmit}
                                className="btn btn-primary btn-lg room-form_btn">
                                Erstellen
                            </button>
                        </form>
                        <button
                            type="button"
                            onClick={this.redirectToHome}
                            className="btn btn-secondary btn-lg room-form_btn_cancel">
                            Abbrechen
                        </button>
                    </div>
                </article>
            </Fragment>
        );
    }
}

CreateRoom.propTypes = {

};

export default withRouter(CreateRoom);