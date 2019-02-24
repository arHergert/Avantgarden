import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import addImg from "@resources/img/lobby/baseline_add_white_18dp.png";
import deleteImg from "@resources/img/lobby/baseline_delete_black_18dp.png"
import uuid from "uuid/v1";

class SubTopicRoom extends Component {

    state = {
        topic: ""
    };

    handleInputChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    renderSubTopics = (data, userId) => {
        return (<Fragment>
            {
                data.userSubTopics.map( topic => (
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
                    onClick={() => this.props.deleteTopic(false, roomId, userId, delTopic)}
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

    renderStartSubTopicButton = (room, currUserId) => {
        let currUser;
        room.users.forEach( user => {
            (user._id === currUserId) ? currUser=user : {};
        });

        if(currUser.adminStatus){
            if(room.userSubTopics.length > 1){
                return (
                    <div>
                        <button
                            type="button"
                            onClick={this.props.startDrawRoom}
                            className="btn lobby_start-btn btn-lg btn-block">
                            Malen beginnen!
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
                            Bitte Unterthemen hinzufügen
                        </button>
                    </div>
                );
            }
        }else return null;

    };

    render() {
        return (
            <div >
                <div className={"title_room-info"}>
                     <div style={{color:"#666"}}>Oberthema: {this.props.room.mainTopic}</div>
                </div>
                <ul className={"lobby_list-container"}>
                    <li className="list-group-item">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                name={"topic"}
                                placeholder="Unterthemen hinzufügen"
                                onChange={this.handleInputChange}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    id="button-addon3"
                                    onClick={() => this.submitTopic(false)}
                                >
                                    <img className={"search-icon"} src={addImg}/>
                                </button>
                            </div>
                        </div>
                    </li>
                    {this.renderSubTopics(this.props.room, this.props.userId)}
                    {this.renderStartSubTopicButton(this.props.room, this.props.userId)}
                </ul>
            </div>
        );
    }
}

SubTopicRoom.propTypes = {
    reduceRoomName: PropTypes.func,
    room: PropTypes.object,
    userId: PropTypes.string,
    leaveRoom: PropTypes.func,
    deleteTopic: PropTypes.func,
    addTopic: PropTypes.func,
    startDrawRoom: PropTypes.func
};

export default SubTopicRoom;
