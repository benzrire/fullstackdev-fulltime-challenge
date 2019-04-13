import React, { Component } from 'react'
import { Alert } from 'react-bootstrap'

export default class AlertBox extends Component {

  render() {
    return(
      <div className="d-flex justify-content-center mt-5">
        <Alert variant={this.props.variant}>{this.props.message}</Alert>
      </div>
    )
  }
}
