import React, {Component} from 'react';
import PropTypes from 'prop-types';
import addImg from "@resources/img/lobby/baseline_add_white_18dp.png";

class MainTopicRoom extends Component {


    render() {
        return (
            <div >
                <ul className={"lobby_list-container"}>
                    <li className="list-group-item">
                        <div className="input-group lobby_list-add">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Oberthema hinzufügen"
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    id="button-addon3">
                                    <img className={"search-icon"} src={addImg}/>
                                </button>
                            </div>
                        </div>
                    </li>
                    {/*<li className="list-group-item">Dapibus ac facilisis in</li>*/}
                </ul>
            </div>
        );
    }
}

MainTopicRoom.propTypes = {
    reduceRoomName: PropTypes.func,
    room: PropTypes.object,
    userId: PropTypes.string,
    leaveRoom: PropTypes.func
};

export default MainTopicRoom;
