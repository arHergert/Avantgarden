import React, {Component, Fragment} from 'react';
import Search from "../Home/Search";
import PropTypes from "prop-types";
import Header from "../App/Headers/Header";
import RoomList from "../Home/RoomList";
import NewRoom from "../Home/NewRoom";

/**
 * Mainpage of Avantgarden
 *
 * Contains:
 *  (must-be)
 * - Search for specific rooms
 * - List of all rooms
 * - Create a new room
 *
 *  (explicit)
 * - Entry to gallery?
 *
 *  (attractive)
 * -
 *
 */
class Home extends Component {

    render() {
        return (
            <Fragment>
                <Header/>
                <article className={"mainsec"}>
                   <Search/>
                    <div className={"rooms"}>
                        <NewRoom newRoom={this.props.newRoom} />
                        <RoomList
                            rooms={this.props.rooms}
                            joinRoom={this.props.joinRoom}
                        />
                    </div>
                </article>
            </Fragment>
        );
    }
}

//PropTypes
Home.propTypes = {
    rooms: PropTypes.array.isRequired,
    joinRoom: PropTypes.func,
    newRoom: PropTypes.func
};
export default Home;