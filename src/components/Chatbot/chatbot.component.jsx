import React from "react";
import ChatBot from "react-simple-chatbot";


const CustomChatbot = (props) => {

    const config = {
        width: "300px",
        height: "400px",
        floating: true
    };

    const steps = [
        {
            id: "Greet",
            message: "Hello, Welcome to our shop",
            trigger: "Done"
        },
        {
            id: "Done",
            message: "Have a great day !!",
            end: true
        }
    ];
    return <ChatBot steps={steps}  {...config} />;
}
export default CustomChatbot;