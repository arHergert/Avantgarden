import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import HeaderText from "../App/Headers/HeaderText";
import timerImg from "@resources/img/rooms/baseline_timer_black_18dp.png";
import UserList from "../Lobby/UserList";
import uuid from "uuid/v1";

class JoinRoom extends Component {

    state = {
      name: "Haus",
        maxPerson:5,
        users: [
            {id: uuid(), name: "Test McTestTest" },
            {id: uuid(),name: "Christian Bale"},
            {id: uuid(),name: "Michael Jackson" },
            {id: uuid(),name: "Scarlett Johannson" }
        ]
    };

    componentDidMount(){

    }

    reduceRoomName = (name) => {
        return name.length > 20 ? (name.substring(0, 20) + "...") : name;
    };

    onSubmit = (event) => {
        event.preventDefault();
        //TODO
        //Methode in App aufrufen
        //State ändern

        this.props.history.push({
            pathname: "/lobby",
            data: this.state,
            reduceRoomName: this.reduceRoomName
        });
    };

    redirectToHome = () => {
        this.props.history.push("/");
    };

    renderPasswordInput = (hasPassword) => {
        if (hasPassword){
            return (
            <div className="form-group">
                <input
                    required={true}
                    type="input"
                    className={"form-control"}
                    id="password"
                    placeholder="Password eingeben *"
                />
            </div>)
        }
    };

    render() {
       //const room = this.props.location.data;

        return (
            <div>
                <Fragment>
                    <HeaderText/>
                    <article className={"mainsec"}>
                        <UserList users={this.state.users} maxPerson={this.state.maxPerson}/>
                        <div className={"room-title-flexible"}>
                            Raum
                            <span style={{color:"#219653", fontWeight: "bold"}}> {this.reduceRoomName(this.state.name)} </span>
                            beitreten
                        </div>
                        <div className={"room-form"}>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        required={true}
                                        type="input"
                                        className={"form-control"}
                                        id="nickname"
                                        placeholder="Nickname eingeben *"
                                    />
                                </div>
                                {/*{this.renderPasswordInput(room.password)}*/}
                                <button
                                    type="button"
                                    onClick={this.onSubmit}
                                    className="btn btn-primary btn-lg room-form_btn">
                                    Raum beitreten
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
            </div>
        );
    }
}

JoinRoom.propTypes = {

};

export default withRouter(JoinRoom);
