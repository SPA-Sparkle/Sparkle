import React, { useState } from 'react';
import axios from 'axios';
import Inputform from '../Components/InputForm';
import ChatWindow from '../Components/ChatWindow';
import ChoiceButtons from '../Components/ChoiceButtons';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [genre, setGenre] = useState('');
    const [characterName, setCharacterName] = useState('');
    const [branchingCount, setBranchingCount] = useState('');
    const [gameStarted, setGameStarted] = useState(false);
    const [systemMessage, setSystemMessage] = useState(null);
    const [branchingCompleted, setBranchingCompleted] = useState(false);

    const apiKey = process.env.REACT_APP_API_KEY;
    const organizationId = process.env.REACT_APP_ORGANIZATION_ID;
    const projectId = process.env.REACT_APP_PROJECT_ID;

    if (!apiKey || !organizationId || !projectId) {
        console.error("환경 변수가 설정되지 않았습니다.");
        return <div>환경 변수를 설정해 주세요.</div>;
    }

    const handleStartGame = async () => {
        const initialSystemMessage = {
            role: 'system',
            content: `장르는 ${genre}이고, 캐릭터 이름은 ${characterName}인 소설을 써줘. 
            내가 선택할 수 있는 선택지는 항상 4개로 해줘.
            너가 소설을 쓰고 4개의 선택지를 주면 내가 1,2,3,4 중 하나의 대답을 할게.
            그러면 너가 그 선택지에 해당하는 다음 내용을 써줘.
            분기수는 ${branchingCount}개로 하고싶어.
            max_tokens는 2000으로 설정되어있어.
            예를 들자면, ${characterName}는 ~
            1. ~
            2. ~ ... 이런식으로 짜줘`            
        };

        setSystemMessage(initialSystemMessage);

        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: "gpt-4o",
                messages: [initialSystemMessage],
                max_tokens: 2000,
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
                role: 'assistant',
                content: response.data.choices[0].message.content
            };

            setMessages([botMessage]);
            setGameStarted(true);
        } catch (error) {
            console.error('Error starting game:', error.response ? error.response.data : error.message);
        }
    };

    const handleChoice = async (choice) => {
        const userMessage = {
            role: 'user',
            content: `사용자: ${choice}`
        };

        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);

        const requestMessages = [systemMessage, ...updatedMessages];

        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: "gpt-4o",
                messages: requestMessages,
                max_tokens: 2000,
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
                role: 'assistant',
                content: response.data.choices[0].message.content
            };

            setMessages(prevMessages => {
                const newMessages = [...prevMessages, botMessage];
                
                if (!branchingCompleted && newMessages.length > (parseInt(branchingCount) + 1)) {
                    const endMessage = {
                        role: 'assistant',
                        content: "이제 추가로 이야기를 생성하지 말고, 마무리 해줘."
                    };
                    setBranchingCompleted(true);
                    return [...newMessages, endMessage];
                }
                return newMessages;
            });
        } catch (error) {
            console.error('Error sending choice:', error.response ? error.response.data : error.message);
        }
    };

    const handleDownloadTxt = () => {
        const content = messages.map(msg => `${msg.role === 'user' ? '사용자' : '챗봇'}: ${msg.content}`).join("\n");
        const element = document.createElement("a");
        const file = new Blob([content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "chat_log.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        document.body.removeChild(element); // Clean up
    };

    return (
        <div>
            <h1>Interactive Story Game</h1>
            {!gameStarted && (
                <Inputform
                    genre={genre}
                    setGenre={setGenre}
                    characterName={characterName}
                    setCharacterName={setCharacterName}
                    branchingCount={branchingCount}
                    setBranchingCount={setBranchingCount}
                    handleStartGame={handleStartGame}
                />
            )}
            {gameStarted && (
                <>
                    <ChatWindow messages={messages} />
                    <ChoiceButtons handleChoice={handleChoice} />
                    {/* 추가된 버튼 */}
                    <button onClick={handleDownloadTxt}>Download Chat Log as TXT</button>
                </>
            )}
        </div>
    );
};

export default Chat;
