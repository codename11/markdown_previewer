import React from 'react';
import Glyph from './Glyph.js';

class Arrow extends React.Component{

    render(){ 
		return (
			<div id={this.props.id}><Glyph className={"glyphicon glyphicon-align-justify"}/></div>
		);  
	}
}

export default Arrow;