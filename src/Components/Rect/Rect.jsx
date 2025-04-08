import React, { Component } from 'react'
import "./rect.css"

export default class Rect extends Component {
  render() {
    const { x, y, w, h, color, active } = this.props
    return (
      <div style={{
        top: y+'px', 
        left: x+'px', 
        width: w+'px', 
        height: h+'px', 
        background: color, 
        border: (active? "solid 5px blue":'none')}} className='rect'>    

      </div>
    )
  }
}
