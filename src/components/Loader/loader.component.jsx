import Loader from 'react-loader-spinner';
import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './loader.styles.css';

export default class LoaderHome extends React.Component {

    render() {
        return (
            <div className="loader">
                <Loader
                    type="BallTriangle"
                    color="#18ffff"
                    height={100}
                    width={100}
                    timeout={0} //3 secs

                />

                <h1 className="heading1">Loading...</h1>
            </div>
        );
    }
}
