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
    if (this.state.shape != 'freehand') return
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

  hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);  // Remove the '#' and convert to integer
    const r = (bigint >> 16) & 255;  // Extract the red component         
    const g = (bigint >> 8) & 255;   // Extract the green component
    const b = bigint & 255;          // Extract the blue component
    return { r, g, b };
  }
  handleClick = (e) => {
    if (this.state.shape === 'bucket') {
      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext('2d');
      const { offsetX, offsetY } = e.nativeEvent;
      const targetColor = ctx.getImageData(offsetX, offsetY, 1, 1).data;
      const fillColor = this.hexToRgb(this.state.brushColor);

      const matchColor = (data, x, y, color) => {
        const index = (y * canvas.width + x) * 4;
          return (
            data[index] === color[0] &&
            data[index + 1] === color[1] &&
            data[index + 2] === color[2] &&
            data[index + 3] === color[3]
        );
      };

      const setColor = (data, x, y, color) => {
      const index = (y * canvas.width + x) * 4;
      data[index] = color.r;
      data[index + 1] = color.g;
      data[index + 2] = color.b;
      data[index + 3] = 255; // Fully opaque
      };

      const floodFill = (x, y, targetColor, fillColor) => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const stack = [[x, y]];

      while (stack.length) {
        const [currentX, currentY] = stack.pop();
        if (
        currentX < 0 ||
        currentY < 0 ||
        currentX >= canvas.width ||
        currentY >= canvas.height
        ) {
        continue;
        }

        const index = (currentY * canvas.width + currentX) * 4;
        if (matchColor(data, currentX, currentY, targetColor)) {
        setColor(data, currentX, currentY, fillColor);
        stack.push([currentX + 1, currentY]);
        stack.push([currentX - 1, currentY]);
        stack.push([currentX, currentY + 1]);
        stack.push([currentX, currentY - 1]);
        }
      }

      ctx.putImageData(imageData, 0, 0);
      };

      floodFill(offsetX, offsetY, targetColor, fillColor);
    }
  }

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
              <option value="bucket">Bucket</option>
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
          onClick={this.handleClick}
          onMouseLeave={this.handleMouseUp}
        ></canvas>
      </div>
    );
  }
}

export default CanvasLayer;