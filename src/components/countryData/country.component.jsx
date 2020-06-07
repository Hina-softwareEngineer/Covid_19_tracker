import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class Country extends Component {
    render() {
        let url = this.props;
        console.log(url, url.location, "history", url.match.params.countryId);
        return (
            <div>hello country</div>
        );
    }
}

export default withRouter(Country);