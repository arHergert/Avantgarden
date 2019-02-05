import React, {Component, Fragment} from 'react';

class Home extends Component {
    render() {
        return (
            <Fragment>
                <article className={"mainsec"}>
                    Test
                    {this.props.test}
                </article>
            </Fragment>
        );
    }
}

export default Home;