import React, { Component } from 'react'
import { Container, Row, Col} from 'react-bootstrap'
import MoneySlot from '../containers/moneyslot'
import { getFullDate, getDifferenceDate } from '../constraint'

class RentConfirm extends Component {

  componentDidUpdate() {
    if(this.props.rentLocker.locker.rent_fee <= this.props.moneyslot.money) {
      this.props.setConfirm(true)
    }else {
      this.props.setConfirm(false)
    }
  }

  render() {
    return(
      <div className="d-flex flex-column pr-5">
        <span style={{fontSize: "25px"}}>Payment method</span>
        <span className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
        <div className="mt-5 d-flex flex-row">
          <strong style={{fontSize: "20px"}}>Locker detail</strong>
        </div>
        <div className="mt-2 pr-5 d-flex flex-row justify-content-between">
          <span>Locker number</span>
          <span>{this.props.rentLocker.locker.locker_number}</span>
        </div>
        <div className="pr-5 d-flex flex-row justify-content-between">
          <span>Locker size</span>
          <span>{this.props.rentLocker.locker.size}</span>
        </div>
        <div className="pr-5 d-flex flex-row justify-content-between">
          <span>Rent first hour fee</span>
          <span>{this.props.rentLocker.locker.rent_fee} {this.props.rentLocker.locker.fee_unit}</span>
        </div>
        <div className="pr-5 d-flex flex-row justify-content-between">
          <span>Rent next hour fee</span>
          <span>{this.props.rentLocker.locker.next_fee} {this.props.rentLocker.locker.fee_unit}</span>
        </div>
        <div className="mt-5 pr-5 d-flex flex-row justify-content-between">
          <span style={{fontSize: "20px"}}>Total</span>
          <span style={{fontSize: "20px"}}>{this.props.rentLocker.locker.rent_fee} {this.props.rentLocker.locker.fee_unit}</span>
        </div>
        <div className="mt-1 pr-5 d-flex flex-row justify-content-between">
          <span style={{fontSize: "20px"}}>Paid</span>
          <span style={{fontSize: "20px"}}>{this.props.moneyslot.money} {this.props.rentLocker.locker.fee_unit}</span>
        </div>
      </div>
    )
  }
}

class ReturnConfirm extends Component {

  state = {
    differenceDate: 0,
    total: 0
  }

  componentDidMount() {
    this.setState({
      differenceDate: getDifferenceDate(this.props.return_date, this.props.returnLocker.inuse.rent_date),
      total: parseInt(this.props.returnLocker.locker.next_fee, 10) * getDifferenceDate(this.props.return_date, this.props.returnLocker.inuse.rent_date)
    })
  }

  componentDidUpdate() {
    if(this.state.total <= this.props.moneyslot.money) {
      this.props.setConfirm(true)
    }else {
      this.props.setConfirm(false)
    }
  }

  render() {
    return(
      <div className="d-flex flex-column pr-5">
        <span style={{fontSize: "25px"}}>Payment method</span>
        <span className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
        <div className="mt-5 d-flex flex-row">
          <strong style={{fontSize: "20px"}}>Locker detail</strong>
        </div>
        <div className="mt-2 pr-5 d-flex flex-row justify-content-between">
          <span>Locker number</span>
          <span>{this.props.returnLocker.locker.locker_number}</span>
        </div>
        <div className="pr-5 d-flex flex-row justify-content-between">
          <span>Locker size</span>
          <span>{this.props.returnLocker.locker.size}</span>
        </div>
        <div className="pr-5 d-flex flex-row justify-content-between">
          <span>Rent first hour fee</span>
          <span>{this.props.returnLocker.locker.rent_fee} {this.props.returnLocker.locker.fee_unit}</span>
        </div>
        <div className="pr-5 d-flex flex-row justify-content-between">
          <span>Rent next hour fee</span>
          <span>{this.props.returnLocker.locker.next_fee} {this.props.returnLocker.locker.fee_unit}</span>
        </div>
        <div className="mt-5 d-flex flex-row">
          <strong style={{fontSize: "20px"}}>Rent detail</strong>
        </div>
        <div className="pr-5 d-flex flex-row justify-content-between">
          <span>Rent start date</span>
          <span>{getFullDate(this.props.returnLocker.inuse.rent_date)}</span>
        </div>
        <div className="pr-5 d-flex flex-row justify-content-between">
          <span>Return date</span>
          <span>{getFullDate(this.props.return_date)}</span>
        </div>
        <div className="pr-5 d-flex flex-row justify-content-between">
          <span>Time usage</span>
          <span>{this.state.differenceDate}</span>
        </div>
        <div className="mt-5 pr-5 d-flex flex-row justify-content-between">
          <span style={{fontSize: "20px"}}>Total</span>
          <span style={{fontSize: "20px"}}>{this.state.total} {this.props.returnLocker.locker.fee_unit}</span>
        </div>
        <div className="mt-1 pr-5 d-flex flex-row justify-content-between">
          <span style={{fontSize: "20px"}}>Paid</span>
          <span style={{fontSize: "20px"}}>{this.props.moneyslot.money} {this.props.returnLocker.locker.fee_unit}</span>
        </div>
      </div>
    )
  }
}

export default class Confirm extends Component {
  render() {
    return(
      <div className="d-flex w-100 my-5 justify-content-center">
        <Container>
          <Row>
            <Col lg={6} className="p-4">
              {this.props.controller.task === "rent" && <RentConfirm {...this.props} />}
              {this.props.controller.task === "return" && <ReturnConfirm {...this.props} />}
            </Col>
            <Col lg={6} className="border border-muted rounded p-4">
              <MoneySlot />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
