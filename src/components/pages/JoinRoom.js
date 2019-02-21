import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import Header from "../App/Headers/HeaderText";
import UserList from "../Lobby/UserList";
import ip from "../ipConfig";
import axios from "axios";
import url from "url";

class JoinRoom extends Component {

    state = {
        interval:{
            fetchRoom: null
        },
        data: null,
        userid: null,
        nickname: "",
        password: "",
        passwError: null,
        nameError: null

    };

    reduceRoomName = (name) => {
        return name.length > 25 ? (name.substring(0, 25) + "...") : name;
    };

    onSubmit = (event) => {
        event.preventDefault();

        if(this.state.nickname === "" ){
            this.setState({nameError: "Bitte Namen eingeben!"});
            return;
        }else{
            this.setState({nameError: null});
        }

        if(this.state.data.password !== null){
            if(this.state.data.password !== this.state.password){
                this.setState({passwError: "Falsches Passwort! Bitte erneut eingeben"});
            }else{
                this.setState({passwError: null});
                this.addCurrentUserToRoom(this.state.nickname);
            }
        }else {
            this.addCurrentUserToRoom(this.state.nickname);
        }


    };

    redirectToLobby = () => {
        this.props.history.push({
            pathname: "/lobby",
            roomid: (this.props.location.id === undefined || this.props.location.id === null)
                ? sessionStorage.getItem("id") : this.props.location.id,
            userid: this.state.userid
        });
    };

    addCurrentUserToRoom = (username) => {
        const roomid = (this.props.location.id === undefined || this.props.location.id === null)
            ? sessionStorage.getItem("id") : this.props.location.id;

        axios.post(`${ip.client}/api/rooms/${roomid}/users`, {name: username})
            .then( res =>
                {
                    this.setState({userid: res.data})
                }
            )
            .then(() => this.redirectToLobby())
            .catch(err => console.error(err));
    };

    redirectToHome = () => {
        sessionStorage.clear();
        clearInterval(this.state.interval.fetchRoom);
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
                    name="password"
                    onChange={this.handleInputChange}
                    id="password"
                    placeholder="Password eingeben *"
                />
                <div className="invalid-feedback d-block">
                    {this.state.passwError}
                </div>
            </div>)
        }
    };

    handleInputChange = e => {
      this.setState({[e.target.name]: e.target.value});
    };

    sessionStorageIsNotDefined = (sessId) => {
        return (sessionStorage.getItem("id") === "undefined" ||
            sessionStorage.getItem("id") === "null" ||
            sessionStorage.getItem("id") === null ||
            sessionStorage.getItem("id") === undefined);
    };

    fetchRoom = async (id) => {
        axios.get(`${ip.client}/api/rooms/${id}`)
            .then( res => this.setState({data: res.data}))
            .catch(err => console.error(err));
    };

    componentDidMount(){
        if(this.props.location.search !== null || this.props.location.search !== undefined ){
            const search = url.parse(this.props.location.search).query;
            this.fetchRoom(search)
                .then(this.state.interval.fetchRoom = setInterval(() => this.fetchRoom(search), 2000 ))
                .catch(err => console.error(err));
            sessionStorage.setItem("id", search);
            this.props.location.roomid = search;
        }else if(this.sessionStorageIsNotDefined(sessionStorage.getItem("id"))){
            this.fetchRoom(this.props.location.roomid)
                .then(this.state.interval.fetchRoom = setInterval(() => this.fetchRoom(this.props.location.roomid), 2000 ))
                .catch(err => console.error(err));
            sessionStorage.setItem("id", this.props.location.roomid);
            console.log("Data was fetched with PropID",this.props.location.roomid );
        }else {
            this.fetchRoom(sessionStorage.getItem("id"))
                .then(this.state.interval.fetchRoom = setInterval(() => this.fetchRoom(sessionStorage.getItem("id")), 2000 ))
                .catch(err => console.error(err));
            console.log("Data was fetched with Sessionstorage ID", sessionStorage.getItem("id"));
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
                        <Header/>
                        <article className={"mainsec"}>
                        </article>
                    </Fragment>
                </div>
            );
        }else return (
            <div>
                <Fragment>
                    <Header/>
                    <article className={"mainsec"}>
                        <UserList users={this.state.data.users} maxPerson={this.state.data.maxPerson}/>
                        <div className={"room-title-flexible"}>
                            <span style={{color:"#219653", fontWeight: "bold"}}> {this.reduceRoomName(this.state.data.name)} </span>
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
                                        name="nickname"
                                        onChange={this.handleInputChange}
                                        placeholder="Nickname eingeben *"
                                    />
                                    <div className="invalid-feedback d-block">
                                        {this.state.nameError}
                                    </div>
                                </div>
                                {this.renderPasswordInput(this.state.data.password)}
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
