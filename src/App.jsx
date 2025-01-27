import html2canvas from 'html2canvas'
import React, { Component } from 'react'

export default class App extends Component {
  renderContent = () => {
    const element = document.getElementById('render')
    html2canvas(element, {onrendered: (dat)=>{
        let data =dat.toDataURL('image.jpg')
        let link = document.createElement('a');
	
	    link.href = data;
	    link.download = 'downloaded-image.jpg';
	
	    document.body.appendChild(link);
	    link.click();
	    document.body.removeChild(link);
    }})
  }
  render() {
    return (
      <div id='main'>
        <div id="render">
            <h1>Megatest</h1>
            <img src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="" />
            <div style={{backgroundColor: "black"}}>
                <h1 style={{color: "White"}}>Mabambam</h1>
            </div>
        </div>
        <button onClick={this.renderContent}>Download</button>
      </div>
    )
  }
}
