import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

export default class Pin extends Component {

  state = {
    counter: 0,
    number: [['1','2','3'],['4','5','6'],['7','8','9'],['0']]
  }

  numberDelete = (event) => {
    if(this.state.counter > 0) {
      this.props.setNumber([...this.props.pin.number.slice(0, this.state.counter - 1), '', ...this.props.pin.number.slice(this.state.counter)])
      this.setState({counter: this.state.counter - 1})
    }
  }

  numberClear = (event) => {
    this.props.resetPin()
    this.setState({counter: 0})
  }

  numberCLicked = (event, value) => {
    if(this.state.counter < 6) {
      this.props.setNumber([...this.props.pin.number.slice(0, this.state.counter), value, ...this.props.pin.number.slice(this.state.counter + 1)])
      this.setState({counter: this.state.counter + 1})
    }
  }

  render() {
    const numberButton = {
      fontSize: "15px",
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      marginBottom: "10px",
      marginRight: "15px"
    }
    const inputSet = {
      border: "solid 1px #CCCCCC",
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      fontSize: "15px",
      width: "30px",
      height: "30px",
      marginLeft: "3px",
      marginRight: "3px"
    }
    return(
      <div className="w-100 d-flex flex-column justify-content-center">
        <h1 className="text-center mt-3 mb-3 display-4">Input your pin</h1>
        <div className="d-flex flex-row justify-content-center mt-5">
          {this.props.pin.number.map((num, index) =>
            <div key={"input-" + index} style={inputSet} className="text-center">{num}</div>
          )}
        </div>
        <div className="d-flex flex-row justify-content-center mt-5">
          <div className="d-flex flex-column justify-content-center">
            {this.state.number.map((numRow, index) =>
              <div className="d-flex flex-row justify-content-center" key={"row-" + index}>
                <div key={"col-" + index} className="text-center">
                  {numRow.map((num, index) =>
                    <Button onClick={(event) => this.numberCLicked(event, num)} key={"num-" + num} variant="outline-info" style={numberButton}>{num}</Button>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="d-flex flex-column justify-content-center align-self-start">
            <Button style={{width: "70px"}} onClick={(event) => this.numberDelete(event)} variant="outline-secondary" className="btn-block btn-sm">del</Button>
            <Button style={{width: "70px"}} onClick={(event) => this.numberClear(event)} variant="outline-danger" className="btn-block btn-sm mt-1">clear</Button>
          </div>
        </div>
      </div>
    )
  }

}
