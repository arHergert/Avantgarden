import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import UserList from "../Lobby/UserList";
import ip from "../ipConfig";
import axios from "axios";
import WaitingRoom from "../Lobby/WaitingRoom";
import Header from "../App/Headers/Header";
import MainTopicRoom from "../Lobby/MainTopicRoom";
import SubTopicRoom from "../Lobby/SubTopicRoom";

class Lobby extends Component {

    state = {
        id: null,
        userId: null,
        interval:{
            fetchRoom: null
        },
        data: null
    };

    leaveRoom = () => {
        sessionStorage.clear();
        clearInterval(this.state.interval.fetchRoom);
        axios.delete(`${ip.client}/api/rooms/${this.state.id}/${this.state.userId}`)
            .then( res => this.setState({userid: null}))
            .then(this.props.history.push("/"))
            .catch(err => console.error(err));
    };

    deleteUserFromRoom = () => {
        axios.delete(`${ip.client}/api/rooms/${this.state.id}/${this.state.userId}`)
            .then( res => this.setState({userid: null}))
            .catch(err => console.error(err));
    };

    reduceRoomName = (name) => {
        return name.length > 25 ? (name.substring(0, 25) + "...") : name;
    };

    renderRoomTitle = () => {
        if(this.state.data !== null && this.state.data.isDrawRoom === false){
            return (
                <div className={"room-title-flexible"}>
                    <span style={{color:"#219653", fontWeight: "bold"}}> {this.reduceRoomName(this.state.data.name)} </span>
                </div>);
        }
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

    componentDidMount(){
        //Raum ID
        if(this.sessionStorageIsNotDefined(sessionStorage.getItem("id"))){
            this.fetchRoom(this.props.location.roomid)
                .then(this.state.interval.fetchRoom = setInterval(() => this.fetchRoom(this.props.location.roomid), 1000 ))
                .then( () => this.state.isLoading = false)
                .catch(err => console.error(err));
            sessionStorage.setItem("id", this.props.location.roomid);
            this.state.id = this.props.location.roomid;
        }else {
            this.fetchRoom(sessionStorage.getItem("id"))
                .then(this.state.interval.fetchRoom = setInterval(() => this.fetchRoom(sessionStorage.getItem("id")), 1000 ))
                .then( () => this.state.isLoading = false)
                .catch(err => console.error(err));
            this.state.id = sessionStorage.getItem("id");
        }

        //User ID
        if (this.userIsNotDefined(sessionStorage.getItem("userid"))){
            sessionStorage.setItem("userid", this.props.location.userid);
            console.log("Prop UserID",this.props.location.userid );
            this.state.userId = this.props.location.userid;
        }else {
            console.log("Set session UserID", sessionStorage.getItem("userid"));
            this.state.userId = sessionStorage.getItem("userid");
        }

        //Warn user before he closes his tab
        /*window.onbeforeunload = (e) => {
            let dialogText = 'Webseite verlasse?';
            e.returnValue = dialogText;
            return dialogText;
        };*/

    }

    deleteTopic = (isMainTopic, roomId, userId, topic) => {
        axios.post(`${ip.client}/api/rooms/${roomId}/topics/delete`,
            {isMainTopic: isMainTopic, value: topic, userId: userId})
            .catch(err => console.error(err));
    };

    addTopic = (isMainTopic, roomId, userId, topic) => {
        axios.post(`${ip.client}/api/rooms/${roomId}/topics`,
            {isMainTopic: isMainTopic, value: topic, userId: userId})
            .catch(err => console.error(err));

    };


    componentWillUnmount(){
        clearInterval(this.state.interval.fetchRoom);
        sessionStorage.clear();
        axios.delete(`${ip.client}/api/rooms/${this.state.id}/${this.state.userId}`)
            .then( res => this.setState({userid: null}))
            .catch(err => console.error(err));
    }

    renderUserlist = () => {
        if(this.state.data !== null && this.state.data.isDrawRoom === false){
            return (
                <div className={"lobby_userlist"}>
                    <UserList currUser={this.state.userId} users={this.state.data.users} maxPerson={this.state.data.maxPerson}/>
                    <button
                        type="button"
                        onClick={this.leaveRoom}
                        className="btn btn-danger lobby_leave-btn">
                        Raum verlassen
                    </button>
                </div>
            );
        }
    };

    renderLobby = () => {
        if (this.state.data === null) {
            return null;
        }else if(this.state.data.isWaitingRoom) {
            return (
                <div>
                    <WaitingRoom
                        reduceRoomName={this.reduceRoomName}
                        leaveRoom={this.leaveRoom}
                        room={this.state.data}
                        startMainTopicRoom={this.startMainTopicRoom}
                        userId={this.state.userId}
                    />
                </div>
            );
        } else if(this.state.data.isMainTopicRoom){
            return (
                <div>
                    <MainTopicRoom
                        reduceRoomName={this.reduceRoomName}
                        leaveRoom={this.leaveRoom}
                        room={this.state.data}
                        userId={this.state.userId}
                        deleteTopic={this.deleteTopic}
                        addTopic={this.addTopic}
                        startSubTopicRoom={this.startSubTopicRoom}
                    />
                </div>
            );
        } else if(this.state.data.isSubTopicRoom){
            return (
                <div>
                    <SubTopicRoom
                        reduceRoomName={this.reduceRoomName}
                        leaveRoom={this.leaveRoom}
                        room={this.state.data}
                        userId={this.state.userId}
                        deleteTopic={this.deleteTopic}
                        addTopic={this.addTopic}
                        startDrawRoom={this.startDrawRoom}
                    />
                </div>
            )
        }else if (this.state.data.isDrawRoom){
            return (
                <div>

                </div>
            );
        }
    };


    /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Functions to move forward to next phases of room managemanet
     * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    startMainTopicRoom = () => {
        if(this.state.data.mainTopic === null || this.state.data.mainTopic === ""){
            axios.put(`${ip.client}/api/rooms/${this.state.id}/isWaitingRoom/isMainTopicRoom`)
                .catch(err => console.error(err));

        }else {
            axios.put(`${ip.client}/api/rooms/${this.state.id}/isWaitingRoom/isSubTopicRoom`)
                .catch(err => console.error(err));
        }
    };

    startSubTopicRoom = () => {
        axios.post(`${ip.client}/api/rooms/${this.state.id}/topics/choose/`, {value: "MainTopics"})
            .then(() => {
                axios.put(`${ip.client}/api/rooms/${this.state.id}/isMainTopicRoom/isSubTopicRoom`)
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));


    };

    startDrawRoom = () => {

    };


    render() {
        return (
            <div>
                <Fragment>
                    <Header/>
                    {this.renderUserlist()}
                    {this.renderRoomTitle()}
                    <article className={"mainsec"}>
                        {this.renderLobby()}
                    </article>
                </Fragment>
            </div>
        );
    }
}

Lobby.propTypes = {
};

export default withRouter(Lobby);
