import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const apiKey = process.env.REACT_APP_API_KEY;
    const organizationId = process.env.REACT_APP_ORGANIZATION_ID;
    const projectId = process.env.REACT_APP_PROJECT_ID;

    if (!apiKey || !organizationId || !projectId) {
        console.error("환경 변수가 설정되지 않았습니다.");
        return <div>환경 변수를 설정해 주세요.</div>;
    }

    const handleSend = async () => {
        const userMessage = {
            role: 'user',
            content: input
        };

        setMessages([...messages, userMessage]);

        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: "gpt-4o",
                messages: [{ role: "user", content: input }],
                max_tokens: 150,
                temperature: 0.5,
            }, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'OpenAI-Organization': organizationId,
                    'OpenAI-Project': projectId,
                    'Content-Type': 'application/json'
                }
            });

            const botMessage = {
                role: 'bot',
                content: response.data.choices[0].message.content
            };

            setMessages([...messages, userMessage, botMessage]);
            setInput('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div>
            <h1>Chat with GPT</h1>
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.role}`}>
                        {msg.content}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' ? handleSend() : null}
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default Chat;