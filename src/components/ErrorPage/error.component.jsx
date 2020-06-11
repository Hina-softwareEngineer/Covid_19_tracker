import React from 'react';
import error from '../../Images/image1.png';
import './error.styles.css';

const Error = () => {
    return (
        <div className="error">
            <img src={error} />
            <h1>Error while making Request</h1>
        </div>
    );
}

export default Error;