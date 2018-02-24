'use strict'

import ReactDOM from 'react-dom';
import React from 'react';
class TodoItem extends React.Component{
	
    // 处理任务是否完成状态
    handlerChange(){
        let isDone = !this.props.isDone;
        this.props.changeTodoState(this.props.index, isDone);
    }

    // 鼠标移入
    handlerMouseOver(){
        ReactDOM.findDOMNode(this.refs.deleteBtn).style.display = "inline";
    }

    // 鼠标移出
    handlerMouseOut(){
        ReactDOM.findDOMNode(this.refs.deleteBtn).style.display = "none";
    }

    // 删除当前任务
    handlerDelete(){
        this.props.deleteTodo(this.props.index);
    }

    render(){
        let doneStyle = this.props.isDone ? {textDecoration: 'line-through'} : {textDecoration: 'none'};

        return (
            <li
                onMouseOver={this.handlerMouseOver.bind(this)}
                onMouseOut={this.handlerMouseOut.bind(this)}
            >
                <input type="checkbox" checked={this.props.isDone} onChange={this.handlerChange.bind(this)} className="roundCheck"/ >
                <span style={doneStyle}>{this.props.text}</span>
                <button ref="deleteBtn" onClick={this.handlerDelete.bind(this)} style={{'display': 'none'}} className="fr btn btn-default btn-sm">删除</button>
            </li>
        )
    }
}

export default TodoItem;