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
			messages: [placeholder]
		}
		this.handleChange = this.handleChange.bind(this);
	}
	
	componentDidMount() {
		
		$("#inner2").resizable({
			handles: 's',
			minHeight: 85,
			height: "100%",
			maxHeight: "120%"
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
					
					<textarea onChange={this.handleChange} defaultValue={placeholder} placeholder="Enter ... some kind a text!? ..." id="editor"></textarea>
					
					<div id="preview" dangerouslySetInnerHTML={this.getMarkdownText()}></div>
						
				</div>
				<div id="arrow"><span className="glyphicon glyphicon-align-justify"></span></div>
			</div>
		);
	}
};

ReactDOM.render(<DisplayMessages/>, document.getElementById('root'));