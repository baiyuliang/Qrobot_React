import React from "react";
import './LeftItem.scss'

function LeftItem(props) {
    return (
        <div className="left-item-container">
            <img className="left-item-head" src="https://pp.myapp.com/ma_icon/0/icon_42284557_1517984341/96"/>
            <div className="left-item-content">
                <Content msg={props.msg}/>
            </div>
        </div>
    )
}

function Content(props) {
    if (props.msg.type === 1) {
        return <div className="left-item-text">
            {props.msg.content}
        </div>
    } else if (props.msg.type === 2) {
        return <img className="left-item-img" src={props.msg.content}/>
    }
}

export default LeftItem
