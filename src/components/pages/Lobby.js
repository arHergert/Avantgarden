import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import HeaderText from "../App/Headers/HeaderText";
import UserList from "../Lobby/UserList";
import ip from "../ipConfig";
import axios from "axios";
import WaitingRoom from "../Lobby/WaitingRoom";

class Lobby extends Component {

    state = {
        id: null,
        userId: null,
        interval:{
            fetchRoom: null
        },
        data: null,
        isWaitingRoom: true,
        isMainTopicRoom: false,
        isSubTopicRoom: false,
        isStyleTopicRoom: false
    };

    leaveRoom = (userId) => {
        sessionStorage.clear();
        clearInterval(this.state.interval.fetchRoom);
        //TODO: User aus Raum entfernen, prüfen ob Raum leer und dann raum löschen
        this.props.history.push("/");
    };

    reduceRoomName = (name) => {
        return name.length > 25 ? (name.substring(0, 25) + "...") : name;
    };

    sessionStorageIsNotDefined = (sessId) => {
        return (sessionStorage.getItem("id") === "undefined" ||
            sessionStorage.getItem("id") === "null" ||
            sessionStorage.getItem("id") === null ||
            sessionStorage.getItem("id") === undefined);
    };

    userIsNotDefined = (sessId) => {
        return (sessionStorage.getItem("userid") === "undefined" ||
            sessionStorage.getItem("userid") === "null" ||
            sessionStorage.getItem("userid") === null ||
            sessionStorage.getItem("userid") === undefined);
    };

    fetchRoom = async (id) => {
        axios.get(`${ip.client}/api/rooms/${id}`)
            .then( res => this.setState({data: res.data}))
            .catch(err => console.error(err));
    };

    startMainTopicRoom = () => {

    };

    componentDidMount(){
        //Raum ID
        if(this.sessionStorageIsNotDefined(sessionStorage.getItem("id"))){
            this.fetchRoom(this.props.location.roomid)
                .then(this.state.interval.fetchRoom = setInterval(() => this.fetchRoom(this.props.location.roomid), 2000 ))
                .then( () => this.state.isLoading = false)
                .catch(err => console.error(err));
            sessionStorage.setItem("id", this.props.location.roomid);
        }else {
            this.fetchRoom(sessionStorage.getItem("id"))
                .then(this.state.interval.fetchRoom = setInterval(() => this.fetchRoom(sessionStorage.getItem("id")), 2000 ))
                .then( () => this.state.isLoading = false)
                .catch(err => console.error(err));
        }

        //User ID
        if (this.userIsNotDefined(sessionStorage.getItem("userid"))){
            sessionStorage.setItem("userid", this.props.location.userid);
            this.state.userId = this.props.location.userid;
        }else {
            console.log("Set session UserID", sessionStorage.getItem("userid"));
            this.state.userId = sessionStorage.getItem("userid");
        }

    }

    componentWillUnmount(){
        clearInterval(this.state.interval.fetchRoom);
        sessionStorage.clear();
    }

    render() {
        if (this.state.data === null) {
            return (
                <div>
                    <Fragment>
                        <HeaderText/>
                        <article className={"mainsec"}>
                        </article>
                    </Fragment>
                </div>
            );
        }else if(this.state.isWaitingRoom) {
            return (
                <div>
                    <WaitingRoom
                        reduceRoomName={this.reduceRoomName}
                        room={this.state.data}
                        startMainTopicRoom={this.startMainTopicRoom}
                        userId={this.state.userId}
                    />
                </div>
            );
        } else return (
            <div>
                <Fragment>
                    <HeaderText/>
                    <article className={"mainsec"}>
                    </article>
                </Fragment>
            </div>
        );
    }
}

Lobby.propTypes = {
};

export default withRouter(Lobby);
