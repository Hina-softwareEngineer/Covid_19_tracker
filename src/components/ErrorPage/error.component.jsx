import React from 'react';
import error from '../../Images/image1.png';
import './error.styles.css';

const Error = () => {
    return (
        <div className="error">
            <img src={error} alt="404." />
            <h1>Reload the Page</h1>
        </div>
    );
}

export default Error;