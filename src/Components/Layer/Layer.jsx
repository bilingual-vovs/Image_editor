import React, { Component } from 'react'
import './Layer.css'

export default class Layer extends Component {
  constructor(){
    super()
  }
  render() {
    return (
      <div className='layer'>
        {this.props.data.uid}
      </div>
    )
  }
}
