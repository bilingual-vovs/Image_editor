import React, { Component } from 'react'
import "./Workspace.css"

import Layer from '../Layer/Layer' 
import obj from '../../objects' 
import CanvasLayer from '../CanvasLayer/CanvasLayer'
const {LayerObj} = obj


export default class Workspace extends Component {
  constructor(){
    super()
    this.layers = []
  }

  componentDidMount = () => {
    this.createLayer()
    this.forceUpdate()
  }

  render() {
    return (
        <div id="render">
          <CanvasLayer></CanvasLayer>
          {this.layers.map((layer) => {
            return <Layer key={layer.uid} data={layer}/>
          })}
          <button style={{position: "relative", left: "1000px", zIndex: "10"}} onClick={this.createLayer}>add layer</button>
        </div>
    )
  }

  createLayer = (dat) =>{
    this.layers.push(new LayerObj({ uid: this.newLUid, ...dat}))
    this.forceUpdate()
  }

  get layerUids() {
    return this.layers
      .map(el => el.uid)
      .sort((a, b) => a-b)
  }

  get newLUid() {
    return (this.layerUids[this.layerUids.length - 1] + 1) || 0
  }
}
