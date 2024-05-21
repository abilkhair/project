import './Message.css'
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import ChatBox from "../ChatBox/ChatBox.tsx";
import {createMessage, deleteMessage, fetchMessage} from "../../features/messageSlice.ts";
import {message} from "antd";




const Message = () => {

    const [text, setText] = useState({
        name:'',
        myMessage:''
    });

    const dispatch = useAppDispatch();

    const {messages} = useAppSelector((state) => state.message)
    const [messageApi, contextHolder] = message.useMessage();


    const warning = () => {
        messageApi.open({
            type: 'warning',
            content: 'Заполните все поля',
        });
    };



    const onInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target;
        setText((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }
    const onMessageSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       if (text.myMessage.trim() === '' && text.name.trim() === '')  {
            warning();
       } else {
           dispatch(
               createMessage({
                   message: text.myMessage,
                   author: text.name,
               })
           ).then(() => {
               dispatch(fetchMessage());
           });

           setText({
               name:'',
               myMessage: ''
           })
       }
    };

    const deleteMessageHandler = (id:string) => {
        dispatch(deleteMessage(id)).then(() => {
            dispatch(fetchMessage())
        })
    }


    useEffect(() => {
        dispatch(fetchMessage())
    },[dispatch])



    return (


        <div className="messenger-container">
            <div className="message-list">
                {
                    messages.map((val) => (
                        <ChatBox key={val.id} message={val.message} author={val.author} date={val.date} onButtonClick={() => deleteMessageHandler(val.id)}/>
                    ))
                }
            </div>
            <form onSubmit={onMessageSubmit}  className="message-input">
                {contextHolder}
                <input name={'name'} value={text.name} onChange={onInputChange} type="text" className="input-field" placeholder="Enter your name..." />
                <input name={'myMessage'} value={text.myMessage} onChange={onInputChange} type="text" className="input-field" placeholder="Enter your message..." />
                <button type={'submit'} className="button-39">Send</button>
            </form>
        </div>


    );
};

export default Message;
