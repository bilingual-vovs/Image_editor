import React, { Component } from 'react'

export default class NativeLayer extends Component {
  render() {
    return (
      <div className='native-layer'>
        {this.props.objs.map((el, i) => el.render(this.props.uid+i))}
      </div>
    )
  }
}
