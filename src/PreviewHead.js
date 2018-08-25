import React from 'react';

class PreviewHead extends React.Component{

    render(){ 
		return (
			<h1 id={this.props.id} style={this.props.style} className={this.props.className} onClick={this.props.onClick} title={this.props.title}>Previewer:</h1>
		);  
	}
}

export default PreviewHead;