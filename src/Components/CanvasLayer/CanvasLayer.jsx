import React, { Component } from 'react'
import "./style.css"
import { SketchPicker } from 'react-color';

class CanvasLayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brushColor: '#000000',
      brushWidth: 5,
      drawing: false,
      shape: 'freehand', // Options: freehand, rectangle, circle, triangle
    };
    this.canvasRef = React.createRef();
  }

  handleMouseDown = (e) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    this.setState({ drawing: true });
  };

  handleMouseMove = (e) => {
    if (!this.state.drawing) return;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = this.state.brushColor;
    ctx.lineWidth = this.state.brushWidth;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  handleMouseUp = () => {
    this.setState({ drawing: false });
  };

  handleColorChange = (color) => {
    this.setState({ brushColor: color.hex });
  };

  handleBrushWidthChange = (e) => {
    this.setState({ brushWidth: e.target.value });
  };

  handleShapeChange = (shape) => {
    this.setState({ shape });
  };

  render() {
    return (
      <div className="canvas-container">
        <div className="sidebar">
          <h3>Controls</h3>
          <div>
            <label>Brush Width:</label>
            <input
              type="number"
              value={this.state.brushWidth}
              onChange={this.handleBrushWidthChange}
              min="1"
              max="50"
            />
          </div>
          <div>
            <label>Brush Color:</label>
            <SketchPicker
              color={this.state.brushColor}
              onChangeComplete={this.handleColorChange}
            />
          </div>
          <div>
            <label>Shape:</label>
            <select
              value={this.state.shape}
              onChange={(e) => this.handleShapeChange(e.target.value)}
            >
              <option value="freehand">Freehand</option>
              <option value="rectangle">Rectangle</option>
              <option value="circle">Circle</option>
              <option value="triangle">Triangle</option>
            </select>
          </div>
        </div>
        <canvas
          ref={this.canvasRef}
          className="drawing-canvas"
          width={800}
          height={600}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
        ></canvas>
      </div>
    );
  }
}

export default CanvasLayer;