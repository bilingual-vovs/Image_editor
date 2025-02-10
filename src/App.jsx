import html2canvas from 'html2canvas'
import React, { Component } from 'react'
import CanvasImage from './Components/CanvasImage'
import RandomDivs from './Components/RandomDivs'
import Workspace from './Components/Workspace'
import Header from './Components/Header'

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      tool: "none"
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
  onDraw = () => {
    this.setState({tool: (this.state.tool == "draw" ? "none":"draw")})
  }

  render() {
    return (
      <div id='main'>
        <Header onDraw = {this.onDraw} onDownload = {this.renderContent}/>
        <Workspace tool={this.state.tool}/>
      </div>
    )
  }
}
