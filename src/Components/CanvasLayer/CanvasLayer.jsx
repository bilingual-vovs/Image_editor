import React, { Component } from 'react'

export default class CanvasLayer extends Component {
    canvasRef = React.createRef();

    size = 1
  
    paint = (e) => {
        const canvas = this.canvasRef.current;
        if (!canvas) {
            return; 
        }
        if (!this.m) return
        const context = canvas.getContext("2d");
        context.lineWidth = this.size
        const { left, top } = canvas.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        context.lineTo(x, y);   
        context.stroke();
    }; 
    up = () => {
        this.m = false
    }
    down = (evt) => {
        const canvas = this.canvasRef.current;
        if (!canvas) {
            return; 
        }
        
        const context = canvas.getContext("2d");
        context.moveTo(evt.clientX, evt.clientY)
        this.m = true
    }
    chngVal = (evt) => {
        this.size = evt.target.value
    }
  render() {
    return (
      <div className='canvas-layer'>
        <canvas width={1000} height={1000} ref={this.canvasRef} onMouseMove={this.paint} onMouseUp={this.up} onMouseDown={this.down}></canvas>
        <input onChange={this.chngVal}  id='size' type="text" />
      </div>
    )
  }
}
