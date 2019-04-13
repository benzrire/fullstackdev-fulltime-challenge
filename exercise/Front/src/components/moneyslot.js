import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import Radium from 'radium'

class MoneySlot extends Component {

  constructor(props) {
    super(props)
    this.money = {
      coins: ['1', '2', '5', '10'],
      bills: [['20', '50'], ['100', '500'], ['1000']]
    }
  }

  dragStartHandler = (event, money) => {
    event.dataTransfer.setData("money", money)
  }

  dragOverHandler = (event) => {
    event.preventDefault();
  }

  dropHandler = (event) => {
    let money = parseInt(event.dataTransfer.getData("money"))
    this.props.increaseMoney(money)
  }

  cancelHandle = (event) => {
    this.props.resetMoney()
  }

  render() {

    const slot = {
      width: "280px",
      height: "60px",
      border: "solid 1px #CCCCCC",
      borderRadius: "5px"
    }
    const innerSlot = {
      width: "180px",
      height: "14px",
      backgroundColor: "#555555"
    }
    const slotFont = {
      fontSize: "20px"
    }
    const coinStyle = {
      width: "50px",
      height: "50px",
      backgroundColor: "#EEEEEE",
      borderRadius: "50%",
      lineHeight: "50px",
      textAlign: "center",
      marginY: "10px",
      marginRight: "10px",
      ":hover": {
        backgroundColor: "#DDDDDD",
        cursor: "pointer"
      }
    }
    const billStyle = {
      width: "180px",
      height: "70px",
      backgroundColor: "#EEEEEE",
      borderRadius: "2px",
      lineHeight: "70px",
      textAlign: "center",
      marginBottom: "20px",
      marginRight: "20px",
      ":hover": {
        backgroundColor: "#DDDDDD",
        cursor: "pointer"
      }
    }
    const changeBox = {
      width: "200px",
      height: "60px",
      border: "solid 1px #F5F5F5",
      borderRadius: "5px",
      color: "#AAAAAA",
      fontSize: "12px",
      lineHeight: "60px",
      textAlign: "center",
      ":hover": {
        border: "solid 1px #F0F0F0",
        backgroundColor: "#F0F0F0",
        cursor: "pointer"
      }
    }

    return(
      <div>
        <div className="d-flex flex-column">
          <span style={slotFont}>Money slot</span>
          <small className="text-muted mb-3">This component is simulate the money slot. (Hardware part)</small>
          <div className="d-flex flex-row">
            <div style={slot} className="shadow d-flex justify-content-center align-items-center">
              <div onDragOver={(event) => this.dragOverHandler(event)} onDrop={(event) => this.dropHandler(event)} style={innerSlot}></div>
            </div>
            <div style={changeBox} className="ml-2 shadow">
              <span>Your change is {this.props.moneyslot.change} {this.props.rentLocker.locker.fee_unit}</span>
            </div>
          </div>
          <div className="d-flex flex-row my-4">
            {this.money.coins.map((coin, index) =>
              <div onDragStart={(event) => this.dragStartHandler(event, coin)} key={"coin-" + index} style={coinStyle} className="shadow" draggable>{coin}</div>
            )}
          </div>
          <div className="d-flex flex-column">
            {this.money.bills.map((billRow, indexRow) =>
              <div key={"bill-row-" + indexRow} className="d-flex flex-row">
                {billRow.map((bill, index) =>
                  <div onDragStart={(event) => this.dragStartHandler(event, bill)} key={"bill-" + indexRow + "-" + index} style={billStyle} className="shadow" draggable>{bill}</div>
                )}
              </div>
            )}
          </div>
          <Button onClick={(event) => this.cancelHandle(event)} variant="danger" className="mt-2">Cancel</Button>
        </div>
      </div>
    )
  }
}

export default Radium(MoneySlot)
