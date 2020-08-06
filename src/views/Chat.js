import React from "react";
import {getChatResponse} from "../api/ApiChat";
import './Chat.scss'
import RightItem from "../components/RightItem";
import LeftItem from "../components/LeftItem";

class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            msglist: [{
                id: 1,
                type: 1,
                content: '欢迎你！',
                me: false
            }]
        }
        this.listRef = React.createRef();
    }

    //调用接口
    getResponse = (text) => {
        getChatResponse(text).then(res => {
            this.state.msglist.push({
                id: this.state.msglist[this.state.msglist.length - 1].id + 1,
                type: 1,
                content: res.data.answer,
                me: false
            })
            this.setState({
                msglist: this.state.msglist,
            })
            console.log(this.listRef.current.scrollTop, this.listRef.current.scrollHeight)
            this.listRef.current.scrollTop = this.listRef.current.scrollHeight;
        })
    }

    //输入框数据改变时同步state
    changeText = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    //监听enter键
    onKeyup = (e) => {
        if (e.keyCode === 13) {
            this.send()
        }
    }

    //发送文本
    send = () => {
        if (this.state.text) {
            this.state.msglist.push({
                id: this.state.msglist[this.state.msglist.length - 1].id + 1,
                type: 1,
                content: this.state.text,
                me: true
            })
            this.setState({
                msglist: this.state.msglist,
                text: ''
            })
            this.getResponse(this.state.text)
        }
    }

    //自动滚动到底部
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({behavior: "smooth"});
    }

    //数据更新时执行scrollToBottom
    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        return (
            <div className="chat-container">
                <div className="chat-list" ref={this.listRef}>
                    <ul>
                        <ListItem list={this.state.msglist}/>
                    </ul>
                    <div style={{float: "left", clear: "both"}}
                         ref={(el) => {
                             this.messagesEnd = el;
                         }}>
                    </div>
                </div>
                <div className="chat-bottom">
                    <div className="chat-line"/>
                    <div className="chat-input-send">
                        <input placeholder="请输入内容..." value={this.state.text} onChange={this.changeText}
                               className="chat-input" onKeyUp={this.onKeyup}/>
                        <button className="chat-send" onClick={this.send}>发送</button>
                    </div>
                </div>

            </div>
        )
    }

}

function ListItem(props) {
    return props.list.map(item => {
        if (item.me) {
            return <li key={item.id}><RightItem msg={item}/></li>
        } else {
            return <li key={item.id}><LeftItem msg={item}/></li>
        }
    })
}


export default Chat
