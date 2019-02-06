import React, {Component, Fragment} from 'react';
import searchImg from "../../../src/resources/img/search/baseline_search_white_18dp.png";

class Search extends Component {


    onSubmit = (event) => {
      event.preventDefault();
      //TODO
      //Methode in App aufrufen
      //State ändern
    };

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <form onSubmit={this.onSubmit}>
                    <div className="input-group search-form">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nach Raum suchen"
                            aria-label="Nach Raum suchen"
                            aria-describedby="button-addon2"
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-primary"
                                type="button"
                                id="button-addon3">
                                <img className={"search-icon"} src={searchImg}/>
                            </button>
                        </div>
                    </div>
                </form>
            </Fragment>
        );
    }
}

export default Search;