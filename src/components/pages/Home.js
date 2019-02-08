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
                        <NewRoom />
                        <RoomList
                            rooms={this.props.rooms}
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
};
export default Home;