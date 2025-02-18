import React, { Component } from 'react'
import "./Workspace.css"

import Layer from '../Layer/Layer' 
import LayerObj from '../../objects' 

export default class Workspace extends Component {
  constructor(){
    super()
    this.state = {
      layers: []
    }
  }

  componentDidMount = () => {
    this.createLayer()
  }

  render() {
    return (
        <div id="render">
          {this.state.layers.map((layer) => {
            return <Layer key={layer.uid} data={layer}/>
          })}
          <button style={{position: "relative", left: "20px", zIndex: "10"}} onClick={this.createLayer}>add layer</button>
        </div>
    )
  }

  createLayer = (dat) =>{
    this.setState({layers: [...this.state.layers, new LayerObj({ uid: this.newLUid, ...dat})]})
  }

  get layerUids() {
    return this.state.layers
      .map(el => el.uid)
      .sort((a, b) => a-b)
  }

  get newLUid() {
    return (this.layerUids[this.layerUids.length - 1] + 1) || 0
  }
}
