import React from "react";
import ChatBot from "react-simple-chatbot";
import { connect } from 'react-redux';

const Result = ({ steps, country }) => {
    const name = steps.countryName.value;
    let countryData = country.filter(country => (
        country.country.toLowerCase() === name.toLowerCase()
    ))

    if (countryData.length > 0) {
        const { confirmed, deaths, recovered } = countryData[0].values
        return (
            <div>
                <h3>{countryData[0].country}</h3>
                <p>Confirmed Cases : {confirmed}</p>
                <p>Death Cases : {deaths}</p>
                <p>Recovered Cases : {recovered}</p>
            </div>
        );
    }
    else {
        return (<>Not Found.</>);
    }
}

const CustomChatbot = ({ cleanedData }) => {

    const config = {
        width: "300px",
        height: "400px",
        floating: true
    };

    const steps = [
        {
            id: "Greet",
            message: "Hello, Welcome to Covid 19 Tracker",
            trigger: "preventions"
        },
        {
            id: "preventions",
            message: "1. Clean you hands 👏🧼 with soap and water💦 \n\n2. Maintain a safe distance 🚫🧑‍🤝‍🧑 \n\n3. Avoid touching your eyes, mouth and nose 🚫🤦 \n\n4. Avoid Crowded places🚫👬👬  \n\n5. Stay Home🏘, Stay Healthy🍀 🌸 🌼",
            trigger: "Ask Name"
        },
        {
            id: "Ask Name",
            message: "Please type your name",
            trigger: "Waiting user input for name"
        },
        {
            id: "Waiting user input for name",
            user: true,
            trigger: "welcome"
        },
        {
            id: "welcome",
            message: "Hi {previousValue}, Glad to know you !!",
            trigger: "Asking for country Name"
        },
        {
            id: "Asking for country Name",
            message: "Hi, Please type your Country Name?",
            trigger: "countryName"
        },
        {
            id: "countryName",
            user: true,
            trigger: "showData",
        },
        {
            id: "showData",
            component: <Result country={cleanedData} />,
            trigger: "Done",
        },
        {
            id: "Done",
            message: "Do you want to know more about other countries?",
            trigger: "want more",
        },
        {
            id: "want more",
            options: [
                {
                    value: "yes",
                    label: "Yes",
                    trigger: "Asking for country Name"
                },
                {
                    value: "no",
                    label: "No",
                    trigger: "bye"
                }
            ]
        }, {
            id: "bye",
            message: "Hope you are well!! Take Care.",
            end: true
        }
    ];
    return <ChatBot steps={steps}  {...config} />;
}


const mapStateToProps = state => ({
    cleanedData: state.country.cleanedData,
});

export default connect(mapStateToProps, null)(CustomChatbot);