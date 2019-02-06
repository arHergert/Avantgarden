import React, {Component, Fragment} from 'react';
import Header from "../App/Headers/Header";

import timerImg from "@img/rooms/baseline_timer_black_18dp.png";

class CreateRoom extends Component {

    onSubmit = (event) => {
        event.preventDefault();
        //TODO
        //Methode in App aufrufen
        //State ändern
    };

    render() {
        return (
            <Fragment>
                <Header/>
                <article className={"mainsec"}>
                    <div className={"room-title"}>Raum erstellen</div>
                    <div className={"room-form"}>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input
                                    required={true}
                                    type="input"
                                    className={"form-control"}
                                    id="roomname"
                                    placeholder="Raumnamen festlegen"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    required={true}
                                    type="number"
                                    className={"form-control"}
                                    id="maxPers"
                                    min="2"
                                    max="8"
                                    placeholder="Anzahl max. Personen"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="input"
                                    className={"form-control"}
                                    id="theme"
                                    placeholder="Vorgegebenes Oberthema?"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="input"
                                    className={"form-control"}
                                    id="password"
                                    placeholder="Passwort?"
                                />
                            </div>
                            <div className="form-group row room-form_timer">
                                <img className={"room-form_timer_icon"} src={timerImg}/>
                                <label
                                    className="room-form_label_text">
                                    Zeit bis zum Start
                                </label>
                                <div className="room-form_inputmini">
                                    <input type="number"
                                           className="form-control"
                                           id="starttime"
                                           min="120"
                                           max="9999"
                                           placeholder="120 Sekunden"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </article>
            </Fragment>
        );
    }
}

export default CreateRoom;