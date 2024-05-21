import './Chat.css';

interface ChatBoxProps {
    message: string;
    author: string;
    date: string;
    onButtonClick: () => void;
}

const ChatBox = ({ message, author, date, onButtonClick }: ChatBoxProps) => {
    return (
        <div className="chat-box">
            <p className="message-text">{date}:</p>
            <p className="message-text">{author}:</p>
            <p className="message-text">{message}</p>
            <button className="delete-button" onClick={onButtonClick}>
                &#x2716;
            </button>

        </div>
    );
};

export default ChatBox;
