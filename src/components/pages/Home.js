import React, {Component, Fragment} from 'react';
import Search from "../Home/Search";
import PropTypes from "prop-types";
import Header from "../App/Headers/Header";
import RoomList from "../Home/RoomList";
import NewRoom from "../Home/NewRoom";
import axios from "axios";
import ip from "../ipConfig";

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

    constructor(props){
        super(props);
        this.state = {
            interval:{
                fetchAllRooms: null
            },
            rooms: []
        }
    }

    fetchAllRooms = async () => {
        axios.get(`${ip.client}/api/rooms`)
            .then( res => this.setState({rooms: res.data}))
            .catch(err => console.error(err));
    };

    componentDidMount(){
        this.fetchAllRooms()
            .then(this.state.interval.fetchAllRooms = setInterval(this.fetchAllRooms, 2000));
    }

    componentWillUnmount(){
        clearInterval(this.state.interval.fetchAllRooms);
    }

    render() {
        return (
            <Fragment>
                <Header/>
                <article className={"mainsec"}>
                   <Search/>
                    <div className={"rooms"}>
                        <NewRoom />
                        <RoomList
                            rooms={this.state.rooms}
                        />
                    </div>
                </article>
            </Fragment>
        );
    }
}

//PropTypes
Home.propTypes = {
};
export default Home;