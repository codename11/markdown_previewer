import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import 'jquery';
import $ from 'jquery';
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './assets/css/style.css';

var placeholder = '# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here\'s some other cool stuff:\n  \nHeres some code, `<div></div>`, between 2 backticks.\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == \'```\' && lastLine == \'```\') {\n    return multiLineCode;\n  }\n}\n```\n  \nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere\'s also [links](https://www.freecodecamp.com), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | ------------- \nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. And there are numbererd lists too.\n1. Use just 1s if you want! \n1. But the list goes on...\n- Even if you use dashes or asterisks.\n* And last but not least, let\'s not forget embedded images:\n\n![React Logo w/ Text](https://goo.gl/Umyytc)\n';

var counter1 = 0;
var counter2 = 0;
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
		counter2++;
		var editor = document.getElementById("editor");
		
		if(counter2===1){
				
			this.setState({
				messages: [],
			});
			
			editor.value="";
			document.getElementById("eraser").innerHTML = "Populate";
		}
		
		if(counter2===2){
			
			this.setState({
				messages: [placeholder],
			});
			
			editor.value = placeholder;
			document.getElementById("eraser").innerHTML = "Erase";
			counter2 = 0;
		}
		
	}
	
	componentDidMount() {
		var arrow = $("#arrow").offset().top;
		$("#inner2").resizable({
			handles: 's',
			minHeight: 170
		});
		
		$(document.links).filter(function() {
			return this.hostname != window.location.hostname;
		}).attr('target', '_blank');
		
		$( "code" ).wrapInner( "<pre class='box1'></pre>");
		$( "blockquote>p" ).prepend( "<span class='box2'>......</span><span class='box3'></span>");
		
		$(".grid-item1").on("click", function(){
			counter1 ++;
			
			if(counter1===1){
				$(".grid-item1").prop("title", "Click again to go back!");
				$(".grid-item1").addClass("label", {duration:800});
				$("#editor").addClass("preview-editor", {duration:800});
				$("#preview").hide(800);
			}
			
			if(counter1===2){
				$(".grid-item1").prop("title", "Click on me for fullscreen");
				$(".grid-item1").removeClass("label", {duration:800});
				$("#editor").removeClass("preview-editor", {duration:800});
				$("#preview").show(800);
				counter1 = 0;
			}
			
			
		});
		
		$(".grid-item2").on("click", function(){
			counter1 ++;
			
			if(counter1===1){
				$(".grid-item2").prop("title", "Click again to go back!");
				$(".grid-item2").addClass("label", {duration:800});
				$("#preview").addClass("preview-editor", {duration:800});
				$("#editor").hide(800);
			}
			if(counter1===2){
				$(".grid-item2").prop("title", "Click on me for fullscreen");
				$(".grid-item2").removeClass("label", {duration:800});
				$("#preview").removeClass("preview-editor", {duration:800});
				$("#editor").show(800);
				counter1 = 0;
			}
			
		});
		
		$("#inner2").dblclick(function(){
			$("#inner2").css("height", "100%");
		});
		
		
		
		$(window).resize(function(){
			if(arrow !== $("#arrow").offset().top){
				$(".ui-resizable-handle.ui-resizable-s").prop("title", "Double click on me or pull me down to full height");
			}
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
				
			<div className="grid-container" id="inner2">
			<label className="grid-item1" title="Click on me for fullscreen">Editor:</label><label className="grid-item2" title="Click on me for fullscreen">Previewer:</label>	
			
			<div id="erase"><button id="eraser" onClick={this.eraseIt} type="button" className="btn btn-danger btn-lg" title="I erase & populate editor and preview">Erase</button></div>
			
			<textarea id="editor" className="editor1" onChange={this.handleChange} defaultValue={this.state.value} placeholder="Enter ... some kind a text!? ..." title="This is rather obvious isn't it? It's editor window Sherlock :D"></textarea>	
			<div id="preview" className="preview1" dangerouslySetInnerHTML={this.getMarkdownText()} title="It's a preview window, Sherlock ;)"></div>
			
			<div id="arrow"><span className="glyphicon glyphicon-align-justify"></span></div>
			</div>
					
		);
	}
	
};

ReactDOM.render(<DisplayMessages/>, document.getElementById('root'));