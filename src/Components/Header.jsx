import React, { Component } from 'react'
import "./Header.css"

export default class Header extends Component {
  render() {
    return (
      <div id='header'>
        <button onClick={this.props.onDownload}>Download</button>
        <button onClick={this.props.onDraw}>Draw</button>
      </div>
    )
  }
}
