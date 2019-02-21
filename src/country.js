import React, {Component} from 'react';
import './App.css';
import FlagIcon from './FlagIcon.js';
import Clear from './clear.js';


class Country extends Component {

	constructor(props){
		super(props);
		this.state={
			country:[],
			display:false,
			flagg:false,
			input:" ",
			a:" ",
			checkbox:[],
			selected:[],
			unmount:false
		}
		console.log(this.state.checkbox)
	}

	onChange()
	{
		this.setState({display:true})
	}
	unmounting()
	{
		this.setState({unmount:true});
	}
	onChecking(index)
	{
		const offset = 0x1f1a5;
		const uncheckbox = Object.assign([], this.state.checkbox)
		const sel = Object.assign([], this.state.selected)
		let str = (this.state.country[index].flag)
		let a = String.valueOf(String.fromCharCode(offset + str.charAt(0))) + String.valueOf(String.fromCharCode(offset + str.charAt(1)));
		
		if(this.state.checkbox[index])
		{
			sel.push(str);
			uncheckbox[index] = false;
		}
		else
		{
			sel.splice(index,1)
		}
		this.setState({flagg:true, input:index, a:a, checkbox:uncheckbox, selected:sel})
		console.log(a.toString())
	}
	
	componentWillMount()
	{
		console.log(this.props.input);
		fetch("/continents.json")
    	.then(res => res.json())
    	.then(data => {
    		data[this.props.input].countries.map((item) => (this.state.country.push(item)))
    		data[this.props.input].countries.map(() => this.state.checkbox.push(true))
    	})
	}


	render(){
		if(this.state.unmount) 
			return(<div onLoded/>) 
		return(
			<div>
			<div className='country'>
				<h3>Step2</h3>
              <h4>Now, select a country</h4>
				<input className='text' type="text" onClick={this.onChange.bind(this)}/>
				{this.state.display ? (
					this.state.country.map((item, index)=>{
						return <div className='instyle' ><input type="checkbox" key={index} 
								onClick={()=>{this.onChecking(index)}} />{item.name}</div>
						})
					):(<div></div>)
				}
			</div>
				{
					this.state.flagg ? <div className="flag">
										<h1>Selected Flags</h1>
										<div className="flag-container">
										<ul>{ this.state.selected.map((item,index) => 
										<div className="flag-div">{(this.state.a)}
										</div>)}
										</ul>
										</div><Clear clicked={this.unmounting.bind(this)}/>
										</div> : (<div></div>)
				}
			</div>

		)
	}
}

export default Country;