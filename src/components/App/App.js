import React, {Component, Fragment} from 'react';
import "./App.css";
import leafLogo from "../../resources/img/icons8-leaf-filled-50.png";
class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <div className={"header"}>
                    <span className={"title"}>
                        Avantgarden
                    </span>
                    <img className={"leaf-logo"} src={leafLogo}/>
                </div>

            </Fragment>
        )
    }
}

export default App;
