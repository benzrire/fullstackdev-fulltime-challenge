import React, { Component } from 'react'
import Request from 'es6-request'
import { POST_CREATE_INUES } from '../constraint'
import Locker from '../containers/locker'
import Confirm from '../containers/confirm'
import Conclude from '../containers/conclude'
import { Button } from 'react-bootstrap'
import SocketIOClient from 'socket.io-client'

export default class Rent extends Component {

  constructor(props) {
    super(props)
    this.socket = SocketIOClient('localhost:5001',{
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax : 5000,
      reconnectionAttempts: 99999
    })
  }

  state = {
    inuse: null,
    inprogress: []
  }

  componentDidMount() {
    this.socket.on('inprogress list', (list) => {
      this.setState({inprogress: list})
    })
  }

  componentDidUpdate() {
    this.backToHomePage()
  }

  resetStore = () => {
    this.props.resetController()
    this.props.resetChange()
    this.props.resetMoney()
    this.props.resetRentLocker()
    this.props.resetPayment()
    this.socket.disconnect()
  }

  increment = (event) => {
    // update inuse collection and store
    this.setState({rent_date: new Date()})
    if(this.props.controller.step === 0) {
      if(this.state.inprogress.includes(this.props.rentLocker.locker.locker_number)) {
        this.props.resetRentLocker()
      }else {
        this.props.increaseStep()
        this.socket.emit('progress', this.props.rentLocker.locker.locker_number)
      }
    }
    if(this.props.controller.step === 1) {
      Request.post(POST_CREATE_INUES)
      .sendForm({
        locker_number: this.props.rentLocker.locker.locker_number
      })
      .then(([body, res]) => {
        this.setState({inuse: JSON.parse(body)})
        this.props.increaseStep()
        this.socket.emit('unprogress', this.props.rentLocker.locker.locker_number)
        this.props.decreaseMoney(this.props.rentLocker.locker.rent_fee)
        this.props.resetMoney()
      })
    }
    if(this.props.controller.step === 2) {
      this.resetStore()
    }
  }

  decrement = (event) => {
    if(this.props.controller.step === 1) {
      this.socket.emit('unprogress', this.props.rentLocker.locker.locker_number)
    }
    this.props.decreaseStep()
  }

  // homepage do not have step number
  backToHomePage = () => {
    if(this.props.controller.step < 0) {
      this.resetStore()
    }
  }

  cancelHandle = (event) => {
    this.socket.emit('unprogress', this.props.rentLocker.locker.locker_number)
    this.resetStore()
  }

  nextable = () => {
    if(this.props.controller.step === 0) {
      return this.props.rentLocker.selected
    }else if(this.props.controller.step === 1) {
      return this.props.payment.confirmed
    }else if(this.props.controller.step === 2) {
      return true
    }
  }

  render() {
    return(
      <div>
        <div>
          {this.props.controller.step === 0 && <Locker socket={this.socket} inprogress={this.state.inprogress}/>}
          {this.props.controller.step === 1 && <Confirm />}
          {this.props.controller.step === 2 && <Conclude inuse={this.state.inuse}/>}
        </div>
        <div className={"d-flex fixed-bottom p-4 justify-content-" + (this.props.controller.step === 2 ? "start" : "between")}>
          <div>
            {this.props.controller.step !== 2 && <Button variant="info" onClick={(event) => this.decrement(event)}>
              <i className="fas fa-angle-left mr-3" />
              <span>Back</span>
            </Button>}
            {(this.props.controller.step >= 1 && this.props.controller.step < 2) && <Button variant="danger" className="ml-2" onClick={(event) => this.cancelHandle(event)}>
              <span>Cancel</span>
            </Button>}
          </div>
          <Button disabled={!this.nextable()}
            variant={this.props.controller.step === 1 ? "success" : "info"}
            onClick={(event) => this.increment(event)}>
            <span>{this.props.controller.step === 1 ? "Confirm" : (this.props.controller.step === 2 ? "Homepage" : "Next")}</span>
            <i className={"fas ml-3 " + (this.props.controller.step === 1 ? "fa-check" : (this.props.controller.step === 2 ? "fa-home" : "fa-angle-right"))}/>
          </Button>
        </div>
      </div>
    )
  }

}
