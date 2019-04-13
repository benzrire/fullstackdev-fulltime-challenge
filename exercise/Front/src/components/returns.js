import React, { Component } from 'react'
import Request from 'es6-request'
import Pin from '../containers/pin'
import Conclude from '../containers/conclude'
import Confirm from '../containers/confirm'
import { POST_REMOVE_INUSE, POST_CREATE_LOG, GET_LOCKER_INUSE, GET_LOCKER_DETAIL } from '../constraint'
import { Button } from 'react-bootstrap'
import { getDifferenceDate } from '../constraint'
import AlertBox from './alertbox'
import SocketIOClient from 'socket.io-client'

export default class Return extends Component {

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
    log: null,
    return_date: null,
    alert: false
  }

  componentDidUpdate() {
    this.backToHomePage()
  }

  backToHomePage = () => {
    if(this.props.controller.step < 0) {
      this.resetStore()
    }
  }

  cancelHandle = (event) => {
    this.resetStore()
  }

  resetStore = () => {
    this.props.resetController()
    this.props.resetChange()
    this.props.resetMoney()
    this.props.resetReturnLocker()
    this.props.resetPayment()
    this.props.resetPin()
    this.socket.disconnect()
  }

  increment = () => {
    if(this.props.controller.step === 0) {
      Request.post(GET_LOCKER_INUSE)
      .sendForm({
        pin: this.props.pin.number.join('')
      })
      .then(([body, res]) => {
        const result = JSON.parse(body)
        if(!result.error) {
          this.props.setInused(true)
          this.props.setInuse(result.inuse)
          Request.post(GET_LOCKER_DETAIL)
          .sendForm({
            locker_number: result.inuse.locker_number
          })
          .then(([body, res]) => {
            this.props.setReturnLocker(JSON.parse(body).locker)
            this.setState({return_date: (new Date()).toString()})
            this.setState({alert: false})
            this.props.increaseStep()
          })
        }else {
          this.setState({alert: true})
        }
      })
    }
    if(this.props.controller.step === 1) {
      Request.post(POST_REMOVE_INUSE)
      .sendForm({
        pin: this.props.pin.number.join('')
      })
      .then(([body, res]) => {
        const result = JSON.parse(body)
        console.log(this.state)
        if(!result.error) {
          Request.post(POST_CREATE_LOG)
          .sendForm({
            locker_number: result.inuse.locker_number,
            pin: result.inuse.pin,
            rent_date: result.inuse.rent_date,
            return_date: this.state.return_date
          })
          .then(([body, res]) => {
            this.setState({log: JSON.parse(body)})
            this.props.increaseStep()
            this.props.decreaseMoney(getDifferenceDate(this.state.return_date, result.inuse.rent_date) * parseInt(this.props.returnLocker.locker.next_fee))
            this.props.resetMoney()
          })
        }
      })
    }
    if(this.props.controller.step === 2) {
      this.resetStore()
    }
  }

  decrement = (event) => {
    this.props.decreaseStep()
  }

  nextable = () => {
    if(this.props.controller.step === 0) {
      if(this.props.pin.number.every((num) => {return num !== ''})) {
        return true
      }else {
        return false
      }
    }else if(this.props.controller.step === 1) {
      return this.props.payment.confirmed
    }else if(this.props.controller.step === 2) {
      this.socket.emit('refresh')
      return true
    }
  }

  render() {
    return(
      <div>
        <div>
          {this.state.alert && <AlertBox variant="danger" message="Oops! invalid pin 5555555"/>}
          {this.props.controller.step === 0 && <Pin />}
          {this.props.controller.step === 1 && <Confirm return_date={this.state.return_date}/>}
          {this.props.controller.step === 2 && <Conclude log={this.state.log} />}
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
