import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import $ from 'jquery';
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/styles.css';
import './assets/css/animate.min.css';
import EditorHead from './assets/js/EditorHead.js';
import PreviewHead from './assets/js/PreviewHead.js';
import BtnEraser from './assets/js/BtnEraser.js';
import Editor from './assets/js/Editor.js';
import Preview from './assets/js/Preview.js';
import Arrow from './assets/js/Arrow.js';

var defaultMarkdown = '# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here\'s some other cool stuff:\n  \nHeres some code, `<div></div>`, between 2 backticks.\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == \'```\' && lastLine == \'```\') {\n    return multiLineCode;\n  }\n}\n```\n  \nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere\'s also [links](https://www.freecodecamp.com), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | ------------- \nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. And there are numbererd lists too.\n1. Use just 1s if you want! \n1. But the list goes on...\n- Even if you use dashes or asterisks.\n* And last but not least, let\'s not forget embedded images:\n\n![React Logo w/ Text](https://goo.gl/Umyytc)\n';

var renderer = new marked.Renderer();
renderer.link = function( href, title, text ) {
  return '<a target="_blank" href="'+ href +'" title="' + title + '">' + text + '</a>';
};

marked.setOptions({
  breaks: true,
  renderer: renderer,
  sanitize: true
});

class DisplayMessages extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			markdown: defaultMarkdown,
			erase: false,
			goFull: false,
			headViewKlasa: "grid-item",
			headEdKlasa: "grid-item",
			editorKlasa: "",
			previewKlasa: "",
			stilPreview: {},
			stilEditor: {},
			attr: "Click on me for fullscreen",
			inner2H: "",
			h2Inner: false,
			myWidth: null
		};
		this.handleChange = this.handleChange.bind(this);
		this.eraseFields = this.eraseFields.bind(this);
		this.inner2Height = this.inner2Height.bind(this);
		this.myInput = React.createRef();
	}
	
	updateDimensions() {
    if (window.innerWidth <= 768) {
      this.setState({
        myWidth: window.innerWidth
      });
    } else {
      let update_width = window.innerWidth;
      this.setState({
        myWidth: update_width
      });
    }
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
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
				markdown: defaultMarkdown,
				erase: !this.state.erase
			});
		
		}
		
	};
	
	/*componentDidMount() {
		
		this.node = ReactDOM.findDOMNode(this);
		$(this.node).resizable({
			handles: 's',
			minHeight: 170
		});

		document.querySelector('.ui-resizable-handle.ui-resizable-s').setAttribute("title", "Double click on me or pull me down to full height");
		
	}*/
	
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
		
		if(clicked_id==="ggEd" && this.state.goFull===false){
			
			this.setState({
				headEdKlasa: this.state.headEdKlasa + " label",
				attr: "Click again to go back!",
				editorKlasa: "preview-editor",
				stilPreview: {display: "none"},
				stilEditor: {paddingTop: "0px"},
				goFull: true
			});

		}
		
		if(clicked_id==="ggEd" && this.state.goFull===true){
			
			this.setState({
				headEdKlasa: this.state.headEdKlasa.substr(0, 9),
				attr: "Click on me for fullscreen",
				editorKlasa: "",
				stilPreview: {display: "block"},
				stilEditor: {paddingTop: "10px"},
				goFull: !this.state.goFull
			});

		}
		
		if(clicked_id==="ggPrev" && this.state.goFull===false){
			
			this.setState({
				headViewKlasa: this.state.headViewKlasa + " label",
				attr: "Click again to go back!",
				previewKlasa: "preview-editor",
				stilEditor: {display: "none"},
				stilPreview: {paddingTop: "0px"},
				goFull: true
			});

		}
		
		if(clicked_id==="ggPrev" && this.state.goFull===true){
			
			this.setState({
				headViewKlasa: this.state.headViewKlasa.substr(0, 9),
				attr: "Click on me for fullscreen",
				previewKlasa: "",
				stilEditor: {display: "block"},
				stilPreview: {paddingTop: "10px"},
				goFull: !this.state.goFull
			});

		}

	}

	handleChange(event){
	
		this.setState({
			markdown: event.target.value
		});

	}
	
	
	
	render(){
	
	const btnText = this.state.erase ? "Populate" : "Erase" ;
	const handleClick = e => this.fullScreen(e.target.id);
	
	const EditorHead1 = <EditorHead id={"item1"} style={this.state.stilEditor} className={this.state.headEdKlasa} onClick={handleClick} title={this.state.attr}/>;
	const PreviewHead1 = <PreviewHead id={"item2"} style={this.state.stilPreview} className={this.state.headViewKlasa} onClick={handleClick} title={this.state.attr}/>;
	const BtnEraser1 = <BtnEraser id={"eraser"} onClick={this.eraseFields} type={"button"} className={"btn btn-danger btn-lg"} title={"Erase & populate both fields"} value={btnText}/>;
	const Editor1 = <Editor id={"editor"} onChange={this.handleChange} className={this.state.editorKlasa} value={this.state.markdown} placeholder={"Enter ... some kind a text!? ..."} title={"This is rather obvious isnt it? Its editor window Sherlock :D"}/>;
	const Preview1 = <Preview id={"preview"} className={this.state.previewKlasa} dangerouslySetInnerHTML={{__html: marked(this.state.markdown, { renderer: renderer })}} title={"Its a preview window, Sherlock ;)"}/>;
	const Arrow1 = <Arrow id={"arrow"}/>;

	if(this.state.myWidth<=768){
		console.log("Alternative");
		console.log(this.state.myWidth);
		return (
				
			<div id="inner2" ref={this.myInput} className="grid-container animated zoomIn" style={{height: this.state.inner2H}} onDoubleClick={this.inner2Height}>
				
				{EditorHead1}
				{Editor1}
				{PreviewHead1}
				{Preview1}
				{BtnEraser1}
				{Arrow1}
				
			</div>
					
		);
	}
	if(this.state.myWidth>768){
		console.log("Normal");
		console.log(this.state.myWidth);
		return (
				
			<div id="inner2" ref={this.myInput} className="grid-container animated zoomIn" style={{height: this.state.inner2H}} onDoubleClick={this.inner2Height}>
				
				{EditorHead1}
				{PreviewHead1}
				{BtnEraser1}
				{Editor1}
				{Preview1}
				{Arrow1}
				
			</div>
					
		);
	}
	}
	
};

ReactDOM.render(<DisplayMessages/>, document.getElementById('root'));