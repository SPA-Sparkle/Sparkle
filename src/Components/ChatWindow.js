import React from 'react';

const ChatWindow = ({ messages }) => {
    return (
        <div className="chat-window">
            {messages.map((msg, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br />') }} />
            ))}
        </div>
    );
};

export default ChatWindow;
