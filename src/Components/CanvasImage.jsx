import React, { Component } from 'react'
import html2canvas from 'html2canvas'

export default class CanvasImage extends Component {
  componentDidMount = () => {
    const img = new Image
    img.src = this.props.src

    const ctx = document.getElementById("canvas").getContext("2d");
    const canv = document.getElementById('canvas')
    
    img.addEventListener("load", () => {
        ctx.drawImage(img, 0, 0);
        html2canvas(canv).then(
            (dat)=>{
              let data = dat.toDataURL('image.jpg')
              let link = document.createElement('a');
              console.log(dat)
              link.href = data;
              link.download = 'downloaded-image.jpg';
          
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          )
    });
    
  }
  render() {
    return (
      <div>
        <canvas id='canvas'>

        </canvas>
      </div>
    )
  }
}
