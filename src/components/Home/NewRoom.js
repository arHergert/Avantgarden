import React, {Component} from 'react';
import addRoomImg from "@img/rooms/baseline_add_grey.png";

class NewRoom extends Component {

    render() {
        return (
            <div onClick={this.props.newRoom} className={"room-new"}>
                <img className={"add-room-icon"} src={addRoomImg}/>
                <span className={"add-room-text"}>Neuer Raum</span>
            </div>
        );
    }
}

export default NewRoom;