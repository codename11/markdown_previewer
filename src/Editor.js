import React from 'react';

class Editor extends React.Component{

    render(){ 
		return (
			<textarea id={this.props.id} onChange={this.props.onChange} className={this.props.className} value={this.props.value} placeholder={this.props.placeholder} title={this.props.title}></textarea>
		);  
	}
}

export default Editor;