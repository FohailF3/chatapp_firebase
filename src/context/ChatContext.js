import React, { createContext, useReducer } from 'react'

export const ChatContext = createContext();
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

export const ChatContextProvider = ({ children }) => {

    const INITIAL_STATE = {
        chatId: "null",
        user: {},
    };

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId: currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid,
                }
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (
        <ChatContext.Provider value={{ data:state, dispatch }} >
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContext;