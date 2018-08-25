import React from 'react';

class BtnEraser extends React.Component{

    render(){ 
		return (
			<button id={this.props.id} onClick={this.props.onClick} type={this.props.type} className={this.props.className} title={this.props.title}>{this.props.value}</button>
		);  
	}
}

export default BtnEraser;