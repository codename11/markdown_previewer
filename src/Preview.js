import React from 'react';

class Preview extends React.Component{

    render(){ 
		return (
			<div id={this.props.id} className={this.props.className} dangerouslySetInnerHTML={this.props.dangerouslySetInnerHTML} title={this.props.title}></div>
		);  
	}
}

export default Preview;