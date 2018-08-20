import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import 'jquery';
import $ from 'jquery';
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './style.css';

var placeholder = '# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here\'s some other cool stuff:\n  \nHeres some code, `<div></div>`, between 2 backticks.\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == \'```\' && lastLine == \'```\') {\n    return multiLineCode;\n  }\n}\n```\n  \nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere\'s also [links](https://www.freecodecamp.com), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | ------------- \nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. And there are numbererd lists too.\n1. Use just 1s if you want! \n1. But the list goes on...\n- Even if you use dashes or asterisks.\n* And last but not least, let\'s not forget embedded images:\n\n![React Logo w/ Text](https://goo.gl/Umyytc)\n';

class DisplayMessages extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: placeholder,
			messages: [placeholder],
			value: placeholder
		}
		this.handleChange = this.handleChange.bind(this);
		this.eraseIt = this.eraseIt.bind(this);
	}
	
	eraseIt(){
		
		this.setState({
			messages: [],
		});
		var editor = document.getElementById("editor");
		editor.value="";
		
	}
	
	componentDidMount() {
		
		$("#inner2").resizable({
			handles: 's',
			minHeight: 170
		});
	}
	
	handleChange(event){

		this.setState({
		
			messages: [event.target.value]
			
		});

	}	
	
	getMarkdownText() {
		var message = this.state.messages.join("");
		var rawMarkup = marked(message, {sanitize: true});
		
		return { __html: rawMarkup };
	}
	
	render(){

		return (
				
			<div className="text-center grid-container" id="inner2">
			<label className="grid-item1">Editor:</label><label className="grid-item2">Previewer:</label>	
			
			<div id="erase"><button id="eraser" onClick={this.eraseIt} type="button" className="btn btn-danger btn-lg">Erase</button></div>
			
			<textarea onChange={this.handleChange} defaultValue={this.state.value} placeholder="Enter ... some kind a text!? ..." id="editor"></textarea>	
			<div id="preview" dangerouslySetInnerHTML={this.getMarkdownText()}></div>
			
			<div id="arrow"><span className="glyphicon glyphicon-align-justify"></span></div>
			</div>
					
		);
	}
};

ReactDOM.render(<DisplayMessages/>, document.getElementById('root'));