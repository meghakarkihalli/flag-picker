import React, {Component} from 'react';
import './App.css';
import FlagIcon from './FlagIcon.js';


class Country extends Component {

	constructor(props){
		super(props);
		this.state={
			country:[],
			display:false,
			flagg:false,
			input:" "
		}
	}

	onChange()
	{
		this.setState({display:true})
	}
	onChecking(index)
	{

		this.setState({flagg:true,input:index})


	}

	componentWillMount()
	{
		console.log(this.props.input);
		fetch("/continents.json")
    	.then(res => res.json())
    	.then(data => {
    		data[this.props.input].countries.map((item) => this.state.country.push(item))
    	})
	}


	render(){
		return(
			<div>
			<div className='country'>
				<h3>Step2</h3>
              <h4>Now, select a country</h4>
				<input className='text' type="text" onClick={this.onChange.bind(this)}/>
				{this.state.display ? (
					this.state.country.map((item, index)=>{
						return <div className='instyle' ><input type="checkbox" key={index} 
								onClick={()=>{this.onChecking(index)}}/>{item.name}</div>
						})
					):(<div></div>)
				}
			</div>
				{

					this.state.flagg ? <div className="flag">
										<h1>Flags</h1>
										<div>
										<p>{String.fromCodePoint((this.state.country[this.state.input].flag).toString())}</p>
										</div>
										<button>Clear Flags</button>
										</div> : (<div></div>)
				}
			</div>

		)
	}

}

export default Country;