import React, { Component } from 'react'
import "./Workspace.css"

import Layer from '../Layer/Layer'  

export default class Workspace extends Component {
  constructor(){
    super()
    this.state = {
      layers: [new Layer()]
    }
  }
  render() {
    return (
        <div id="render">
          {this.state.layers.map((layer, i) => {
            return <Layer key={i} data={layer}/>
          })}
        </div>
    )
  }
}
