import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import "./Workspace.css"

export default class Workspace extends Component {
  constructor(){
    super()
  }
  mStat = false

  onMD = () =>{
    this.mStat = true
  }
  onMU = () => {
    this.mStat = false
  }
  onMM = (evt) => {
    if (this.mStat){
        let ctx = document.getElementById('canvas').getContext("2d")
        console.log(evt)
        ctx.fillRect(evt.getX(), evt.getY(), 1, 1)
    }
  }

  render() {
    let style = {
        width: this.props.width || "100%",
        height: this.props.height || "100%"
    }
    return (
        <div style={style} id="render">
            {this.props.tool == "draw" ? (
                <canvas id='canvas' onMouseDown={this.onMD} onMouseMove={this.onMM} onMouseUp={this.onMU}></canvas>
            ):""}
            <h1>Megatest</h1>
            <img src="https://cdn.bicyclerollingresistance.com/images/pictures/vittoria-peyote-xc-race-3.jpg" alt="" />
            <div style={{backgroundColor: "black"}}>
            <h1 style={{color: "White"}}>Mabambam</h1>
            <input onChange={this.inp} type="text" name="" id="inp" />
            {/* <RandomDivs/> */}
            </div>
        </div>
    )
  }
}
