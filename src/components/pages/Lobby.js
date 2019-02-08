import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import HeaderText from "../App/Headers/HeaderText";
import UserList from "../Lobby/UserList";

class Lobby extends Component {
    render() {
        return (
            <div>
                <Fragment>
                    <HeaderText/>
                    <article className={"mainsec"}>
                        <UserList users={} maxPerson={}/>
                        <div className={"room-title-flexible"}>
                            Raum
                            <span style={{color:"#219653", fontWeight: "bold"}}> {this.reduceRoomName(this.state.name)} </span>
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
                                        placeholder="Nickname eingeben *"
                                    />
                                </div>
                                {/*{this.renderPasswordInput(room.password)}*/}
                                <button
                                    type="button"
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

Lobby.propTypes = {};

export default Lobby;
