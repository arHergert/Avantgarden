import React, {Component} from 'react';
import PropTypes from "prop-types";
import Room from "./Room";

class RoomList extends Component {

    filterFullRooms = (rooms) => {
      return rooms.filter(room => room.maxPerson !== room.currPerson);
    };

    render() {
        return this.filterFullRooms(this.props.rooms).map( room => (
            <Room
                key={room.id}
                data={room}
            />
        ));
    }
}

//PropTypes
RoomList.propTypes = {
    rooms: PropTypes.array.isRequired,
};
export default RoomList;