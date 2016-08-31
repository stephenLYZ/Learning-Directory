'use strict'

import React from 'react';

class TodoFooter extends React.Component{
	handleAllState(event){
		this.props.changeTodoState(null,event.target.checked,true);
	}

	handleClick(event){
		this.props.clearDone();
	}

	render(){
		return (
				<div className="clearfix todo-footer">
					<input type="checkbox" checked={this.props.isAllChecked} onChange={this.handleAllState.bind(this)}  className="fl" />
					<span className="fl"> {this.props.todoDoneCount} 已完成 / {this.props.todoCount} 总数 </span>
					<button onClick={this.handleClick.bind(this)} className="fr btn btn-primary btn-md">清除已完成</button>
				</div>
			);
	}
}

export default TodoFooter;