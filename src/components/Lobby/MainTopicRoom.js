import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import addImg from "@resources/img/lobby/baseline_add_white_18dp.png";
import deleteImg from "@resources/img/lobby/baseline_delete_black_18dp.png"
import uuid from "uuid/v1";
class MainTopicRoom extends Component {

    state = {
        topic: ""
    };

    handleInputChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    renderMainTopics = (data, userId) => {
        return (<Fragment>
            {
                data.userMainTopics.map( topic => (
                    <li
                        key={uuid()}
                        className={"list-group-item"}
                    >
                        <div className={"float-left"}>
                            {topic.value}
                        </div>
                        <div className={" align-right"}>
                            {this.renderDeleteBtn(topic, data._id, userId, topic.value)}
                        </div>
                    </li>
                ))
            }
        </Fragment>);

    };

    renderDeleteBtn = (topic, roomId, userId, delTopic ) => {
        if(topic.userId === userId){
            return (
                <div
                    onClick={() => this.props.deleteTopic(true, roomId, userId, delTopic)}
                >
                    <img className={"room-icon"} src={deleteImg}/>
                </div>
            );
        }else {
            return (<div className={"placeholder-width"}>
            </div>);
        }
    };

    submitTopic = (isMainTopic) => {
        if(this.state.topic !== ""){
            this.props.addTopic(isMainTopic, this.props.room._id, this.props.userId, this.state.topic)
        }
    };

    renderStartMainTopicButton = (room, currUserId) => {
        let currUser;
        room.users.forEach( user => {
            (user._id === currUserId) ? currUser=user : {};
        });

        if(currUser.adminStatus){
            if(room.userMainTopics.length > 1){
                return (
                    <div>
                        <button
                            type="button"
                            onClick={this.props.startSubTopicRoom}
                            className="btn lobby_start-btn btn-lg btn-block">
                            Unterthemen wählen
                        </button>
                    </div>

                );
            }else {
                return (
                    <div>
                        <button
                            type="button"
                            disabled={true}
                            className="btn btn-secondary lobby_start-btn btn-lg btn-block">
                            Bitte Haupthemen hinzufügen
                        </button>
                    </div>
                );
            }
        }else return null;

    };



    render() {
        return (
            <div >
                <ul className={"lobby_list-container"}>
                    <li className="list-group-item">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                name={"topic"}
                                placeholder="Oberthema hinzufügen"
                                onChange={this.handleInputChange}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    id="button-addon3"
                                    onClick={() => this.submitTopic(true)}
                                >
                                    <img className={"search-icon"} src={addImg}/>
                                </button>
                            </div>
                        </div>
                    </li>
                    {this.renderMainTopics(this.props.room, this.props.userId)}
                    {this.renderStartMainTopicButton(this.props.room, this.props.userId)}
                </ul>
            </div>
        );
    }
}

MainTopicRoom.propTypes = {
    reduceRoomName: PropTypes.func,
    room: PropTypes.object,
    userId: PropTypes.string,
    leaveRoom: PropTypes.func,
    deleteTopic: PropTypes.func,
    addTopic: PropTypes.func,
    startSubTopicRoom: PropTypes.func
};

export default MainTopicRoom;
