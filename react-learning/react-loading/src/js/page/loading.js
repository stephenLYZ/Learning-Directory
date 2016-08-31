require('../../css/frozen.css'); //装入样式
var React = require('react'),
	Loading = require('../component/Loading'); //组件模块

var wrap = document.querySelector('.wrap'),
	hideCallback = function(){
		alert('done!');  //卸载组件后的回调
	};

React.render(
	<Loading content='Hello' onHide={hideCallback} isPart={false}/>,wrap);

setTimeout(function(){
	React.unmountComponentAtNode(wrap)},3000); //3秒后卸载组件，模拟触发回调