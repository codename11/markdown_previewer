import React from 'react';

class Glyph extends React.Component{

    render(){ 
		return (
			<span className={this.props.className}></span>
		);  
	}
}

export default Glyph;