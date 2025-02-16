import html2canvas from 'html2canvas'
import React, { Component } from 'react'
import Workspace from './Components/Workspace/Workspace'


export default class App extends Component {

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
        <Workspace/>
      </div>
    )
  }
}
