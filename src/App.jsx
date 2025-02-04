import html2canvas from 'html2canvas'
import React, { Component } from 'react'
import CanvasImage from './Components/CanvasImage'
import RandomDivs from './Components/RandomDivs'

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJxo2NFiYcR35GzCk5T3nxA7rGlSsXvIfJwg&s"
    }
  }
  renderContent = () => {
    const element = document.getElementById('render')
    html2canvas(element, {useCORS: true}).then(
      (dat)=>{
        let data = dat.toDataURL('image.jpg')
        let link = document.createElement('a');
        link.href = data;
        link.download = 'downloaded-image.jpg';
    
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    )
  }
  render() {
    return (
      <div id='main'>
        <div id="render">
            <h1>Megatest</h1>
            <img src={this.state.src} alt="" />
            <div style={{backgroundColor: "black"}}>
            <h1 style={{color: "White"}}>Mabambam</h1>
            <input onChange={this.inp} type="text" name="" id="inp" />
            {/* <RandomDivs/> */}
            </div>
        </div>
        <button onClick={this.renderContent}>Download</button>
      </div>
    )
  }
  inp = (e) => {
    this.setState({src: e.target.value})
  }
}
