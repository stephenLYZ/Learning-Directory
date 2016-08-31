// 2016314
// I love coding
var CommentBox = React.createClass({
	getInitialState: function(){
		return {data: []};
	},
	//使用jquery来发送一个异步请求来更新state
	loadCommentsFromServer:function(){
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data){
				this.setState({data: data});
			}.bind(this),
			//报错提示
			error: function(xhr,status,err){
				console.error(this.props.url,status,err.toString());
			}.bind(this)
		});
	},
	handleCommentSubmit: function(comment){
		var comments = this.state.data;
		comment.id = Date.now();
		var newComments = comments.concat([comment]);
		this.setState({data: newComments});
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'POST',
			data: comment,
			success: function(data){
				this.setState({data: data});
			}.bind(this),
			//报错提示
			error: function(xhr,status,err){
				console.error(this.props.url,status,err.toString());
			}.bind(this)
		});
	},
	componentDidMount: function(){
		this.loadCommentsFromServer();
		setInterval(this.loadCommentsFromServer,this.props.pollInterval);
	},
	render: function() {
	    return (
	      <div className="commentBox">
	        <h1>Comments</h1>
	        <CommentList data={this.state.data} />
	        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
	      </div>
	    );
	 }
});

var CommentList = React.createClass({
	render: function(){
		var commentNodes = this.props.data.map(function(comment){
			return (
				<Comment author={comment.author} key={comment.id}>
					{comment.text}
				</Comment>
			);
		});
		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}
});

var Comment = React.createClass({
	rawMarkup: function(){
		var rawMarkup = marked(this.props.children.toString(),{sanitize: true});
		return { __html: rawMarkup };
	},

	render: function(){
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				<span dangerouslySetInnerHTML={this.rawMarkup()} />
			</div>
		);
	}
});
var CommentForm = React.createClass({
	//监听表单事件，提交表单后清空列表
	getInitialState: function() {
	    return {author: '', text: ''};
	  },
	  handleAuthorChange: function(e) {
	    this.setState({author: e.target.value});
	  },
	  handleTextChange: function(e) {
	    this.setState({text: e.target.value});
	  },
	  handleSubmit: function(e) {
	    e.preventDefault();
	    var author = this.state.author.trim();
	    var text = this.state.text.trim();
	    if (!text || !author) {
	      return;
	    }
	    this.props.onCommentSubmit({author: author, text: text});
	    this.setState({author: '', text: ''});
	  },
	  render: function() {
	    return (
	      <form className="commentForm" onSubmit={this.handleSubmit}>
	        <input
	          type="text"
	          placeholder="Your name"
	          value={this.state.author}
	          onChange={this.handleAuthorChange}
	        />
	        <input
	          type="text"
	          placeholder="Say something..."
	          value={this.state.text}
	          onChange={this.handleTextChange}
	        />
	        <input type="submit" value="Post" className="btn"/>
	      </form>
		);
	}
});
ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);
