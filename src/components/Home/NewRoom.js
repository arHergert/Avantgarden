import React, {Component} from 'react';
import {Link} from "react-router-dom";
import addRoomImg from "@img/rooms/baseline_add_grey.png";

class NewRoom extends Component {

    redirectToCreateRoom = () => {
      this.context.router.history.push("/createroom");
    };

    render() {
        return (
            <Link to={"/createroom"} className={"router-link room-new"}>
                <img className={"add-room-icon"} src={addRoomImg}/>
                <span className={"add-room-text"}>Neuer Raum</span>
            </Link>
        );
    }
}

export default NewRoom;