import React from 'react';

class EditorHead extends React.Component{

    render(){ 
		return (
			<h1 id={this.props.id} style={this.props.style} className={this.props.className} onClick={this.props.onClick}><span className="insignia" title={this.props.title} id="ggEd">Editor:</span></h1>
		);  
	}
}

export default EditorHead;