import React from 'react';

class EditorHead extends React.Component{

    render(){ 
		return (
			<h1 id={this.props.id} style={this.props.style} className={this.props.className} onClick={this.props.onClick} title={this.props.title}>Editor:</h1>
		);  
	}
}

export default EditorHead;