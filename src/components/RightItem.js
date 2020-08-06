import React from "react";
import './RightItem.scss'

function RightItem(props) {
    return (
        <div className="right-item-container">
            <img className="right-item-head" src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1068485212,3292662520&fm=111&gp=0.jpg"/>
            <div className="right-item-content">
                <Content msg={props.msg}/>
            </div>
        </div>
    )
}

function Content(props) {
    if (props.msg.type === 1) {
        return <div className="right-item-text">
            {props.msg.content}
        </div>
    } else if (props.msg.type === 2) {
        return <img className="right-item-img" src={props.msg.content}/>
    }
}

export default RightItem
