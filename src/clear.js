import React, {Component} from 'react';
import Country from './country.js';

class Clear extends Component {
	constructor(props)
	{
		super(props);
	}
	render(){
		return (
			<button onClick={this.props.clicked}>Clear Flags</button>
			)
	}
}

export default Clear;