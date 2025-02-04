import React, { Component } from 'react'

class Div{
    constructor(x, y, w, h, c){
        this.x = x
        this.y = y 
        this.h = h
        this.w = w
        this.c = c 
    }
    get div(){
        return <div style={{position: 'absolute', top: `${this.y}px`, left: `${this.x}px`, width: `${this.w}px`, height: `${this.h}px`, backgroundColor: this.c}}></div>
    }
}

export default class RandomDivs extends Component {

  constructor() {
    super()
    this.state = {
        divs: []
    }
  }

  componentDidMount = () => {
    setInterval(this.genDiv, 500)
  }
  renderContext = () =>{
    return (
        <div>
            {this.state.divs}
        </div>
    )
  }
  render() {
    return (
      <div id='in'>
        {this.renderContext()}
      </div>
    )
  }
  genDiv = () =>{
    this.setState({divs: [...this.state.divs, new Div(
        Math.floor(Math.random()*500),
        Math.floor(Math.random()*500),
        Math.floor(Math.random()*200),
        Math.floor(Math.random()*200),
        `rgba(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*10)})`
    ).div]})
  }
}
