import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import 'jquery';
import $ from 'jquery'
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';



class DisplayMessages extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: "",
			messages: []
		}
		this.handleChange = this.handleChange.bind(this);
	}
	
	componentDidMount() {
		$("#inner2").resizable({
			handles: 's',
			minHeight: 85,
		});
	}
	
	handleChange(event){

		this.setState({
			
			messages: [event.target.value]
			
		});
	console.log(this.state.messages);
	}
	
	getMarkdownText() {
		var message = this.state.messages.join("");
		var rawMarkup = marked(message, {sanitize: true});
		return { __html: rawMarkup };
	}
	
	render(){

		return (
			<div id="wrapper">
				
				<div className="text-center grid-container" id="inner1">
				
				<div className="grid-item1"><label>Editor:</label></div><div className="grid-item2"><label>Previewer:</label></div>	
				</div>
				
				<div className="text-center grid-container" id="inner2">
					<div className="text-center grid-item3">
						<textarea className="form-control" onChange={this.handleChange} defaultValue={this.state.value} placeholder="Enter message ..." id="editor"></textarea>
					</div>
					<div className="grid-item4">
					<pre id="preview" dangerouslySetInnerHTML={this.getMarkdownText()}></pre>
					</div>
				</div>
				
			</div>
		);
	}
};

ReactDOM.render(<DisplayMessages/>, document.getElementById('root'));