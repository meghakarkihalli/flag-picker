import React, { Component } from 'react';
import Country from './country.js';
import './App.css';


class App extends Component {
  
  constructor(){
      super();
      this.state ={
        continent:[],
        contList:[],
        input:'',
        display1:true
      }
    }

  componentWillMount(){
    fetch("/continents.json")
    .then(res => res.json())
    .then(data => {
      data.map((item)=> this.state.continent.push(item))
      data.map((item)=> this.state.contList.push(item.continent))
    })
  }

  onChange(event)
  {
    this.setState({input:(event.target.value).toLowerCase()})
  }
  onUpdate(index)
  {
    this.setState({input:this.state.contList[index],display1:false})
    this.inputEntry.value = ""
  }

  render() {  
    var temp = new RegExp("^.*"+this.state.input+".*$");
    var t1 = this.state.contList.map((item) => item.toLowerCase());
    var t = t1.filter((item) => item.match(temp))
      
    return (
      <div className="App">
        <h1>Flag Picker</h1>
        <h2>This app will help you learn the flags around the world in 3 steps.</h2>
        <br/><br/><br/><br/>
          <div className='continent'>
            <h3>Step1</h3>
            <h4>Select a Continent</h4>
            <input className="text" type="text" ref={el => this.inputEntry=el} onFocus={this.onChange.bind(this)} onChange={this.onChange.bind(this)}/>
            {this.state.display1 ? (
              t.map((item, index) => (<div className="instyle" onClick={this.onUpdate.bind(this, index)} key={index}>{this.state.contList[(t1.indexOf(item))]} </div>))
              ):(<div> You Selected <br/> {this.state.input}</div>)

            }
          </div>          
          {!this.state.display1 ? (
            <div >
              <Country input={this.state.contList.indexOf(this.state.input)}/>
            </div>
          ):(<div></div>)}
       
      </div>
    );
  }
}

export default App;
