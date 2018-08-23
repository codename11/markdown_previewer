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

var renderer = new marked.Renderer();

renderer.link = function( href, title, text ) {
  return '<a target="_blank" href="'+ href +'" title="' + title + '">' + text + '</a>';
};

class DisplayMessages extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			markdown: placeholder,
			erase: false,
			goFull: false,
			headEdKlasa: "grid-item",
			headViewKlasa: "grid-item",
			editorKlasa: "",
			previewKlasa: "",
			stilEditor: {},
			stilPreview: {},
			attr: "Click on me for fullscreen",
			inner2H: "",
			h2Inner: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.eraseFields = this.eraseFields.bind(this);
		this.inner2Height = this.inner2Height.bind(this);
	}

	eraseFields(){
		
		this.setState({
			erase: true
		});

		if(this.state.erase===false){
				
			this.setState({
				markdown: ""
			});

		}

		if(this.state.erase===true){
			
			this.setState({
				markdown: placeholder,
				erase: !this.state.erase
			});
		
		}
		
	};
	
	handleChange(event){

		this.setState({
			markdown: event.target.value
		});

	}
	
	componentDidMount() {
		
		this.node = ReactDOM.findDOMNode(this);
		$(this.node).resizable({
			handles: 's',
			minHeight: 170
		});

		document.querySelector('.ui-resizable-handle.ui-resizable-s').setAttribute("title", "Double click on me or pull me down to full height");
		
	}
	
	inner2Height(){
		
		if(this.state.h2Inner===false){
			this.setState({
				inner2H: "100%",
				h2Inner: true
			});
		}
		
		if(this.state.h2Inner===true){
			this.setState({
				inner2H: "",
				h2Inner: false
			});
		}
		
	}

	fullScreen(clicked_id){
		
		if(clicked_id==="item1" && this.state.goFull===false){
			
			this.setState({
				headEdKlasa: this.state.headEdKlasa + " label",
				attr: "Click again to go back!",
				editorKlasa: "preview-editor",
				stilPreview: {display: "none"},
				goFull: true
			});
			
		}
		
		if(clicked_id==="item1" && this.state.goFull===true){
			
			this.setState({
				headEdKlasa: this.state.headEdKlasa.substr(0, 9),
				attr: "Click on me for fullscreen",
				editorKlasa: "",
				stilPreview: {display: "block"},
				goFull: !this.state.goFull
			});
				
		}
		
		if(clicked_id==="item2" && this.state.goFull===false){
			
			this.setState({
				headViewKlasa: this.state.headViewKlasa + " label",
				attr: "Click again to go back!",
				previewKlasa: "preview-editor",
				stilEditor: {display: "none"},
				goFull: true
			});
			
		}
		
		if(clicked_id==="item2" && this.state.goFull===true){
			
			this.setState({
				headViewKlasa: this.state.headViewKlasa.substr(0, 9),
				attr: "Click on me for fullscreen",
				previewKlasa: "",
				stilEditor: {display: "block"},
				goFull: !this.state.goFull
			});

		}
		
	}

	render(){
	const handleClick = e => this.fullScreen(e.target.id);
	const btnText = this.state.erase ? "Populate" : "Erase" ;
	
		return (
				
			<div className="grid-container" style={{height: this.state.inner2H}} id="inner2" onDoubleClick={this.inner2Height}>
	
			<h1 style={this.state.stilEditor} className={this.state.headEdKlasa} title={this.state.attr} id="item1" onClick={handleClick}>Editor:</h1>
			<h1 style={this.state.stilPreview} className={this.state.headViewKlasa} title={this.state.attr} id="item2" onClick={handleClick}>Previewer:</h1>	
			
			<div id="erase"><button id="eraser" onClick={this.eraseFields} type="button" className="btn btn-danger btn-lg" title="Erase & populate both fields">{btnText}</button></div>
			
			<textarea id="editor" className={this.state.editorKlasa} onChange={this.handleChange} value={this.state.markdown} placeholder="Enter ... some kind a text!? ..." title="This is rather obvious isn't it? It's editor window Sherlock :D"></textarea>	
			<div id="preview" className={this.state.previewKlasa} dangerouslySetInnerHTML={{__html: marked(this.state.markdown, { renderer: renderer })}} title="It's a preview window, Sherlock ;)"></div>
			
			<div id="arrow"><span className="glyphicon glyphicon-align-justify"></span></div>
	
			</div>
					
		);
	}
	
};

ReactDOM.render(<DisplayMessages/>, document.getElementById('root'));