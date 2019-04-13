import React, { Component } from 'react'
import { Container, Row, Col} from 'react-bootstrap'
import MoneySlot from '../containers/moneyslot'
import { getFullDate } from '../constraint'

class Rent extends Component {
  render() {
    return(
      <div className="d-flex flex-column pr-5">
        <span style={{fontSize: "25px"}}>Rent conclusion</span>
        <span className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
        <div className="mt-5 d-flex flex-row">
          <span style={{fontSize: "20px"}}>Locker detail</span>
        </div>
        <div className="mt-2 pr-5 d-flex flex-row justify-content-between">
          <span>Locker number</span>
          <span>{this.props.inuse.locker_number}</span>
        </div>
        <div className="pr-5 d-flex flex-row justify-content-between">
          <span>Rent start</span>
          <span>{getFullDate(this.props.inuse.rent_date)}</span>
        </div>
        <div className="mt-5 mr-5 d-flex flex-column border border-muted rounded p-2">
          <div className="d-flex flex-row justify-content-between">
            <span style={{fontSize: "20px"}}>Pin</span>
            <span style={{fontSize: "20px"}}>{this.props.inuse.pin}</span>
          </div>
          <div className="mt-3 d-flex flex-row">
            <small className="text-danger">Please notes the pin above to use when you wanna get back your item.</small>
          </div>
        </div>
      </div>
    )
  }
}

class Return extends Component {

  render() {
    return(
      <div className="d-flex flex-column pr-5">
        <span style={{fontSize: "25px"}}>Return conclusion</span>
        <span className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
        <div className="mt-5 d-flex flex-row">
          <span style={{fontSize: "20px"}}>Locker detail</span>
        </div>
        <div className="mt-2 pr-5 d-flex flex-row justify-content-between">
          <span>Locker number</span>
          <span>{this.props.log.locker_number}</span>
        </div>
        <div className="pr-5 d-flex flex-row justify-content-between">
          <span>Rent start date</span>
          <span>{getFullDate(this.props.log.rent_date)}</span>
        </div>
        <div className="pr-5 d-flex flex-row justify-content-between">
          <span>Return date</span>
          <span>{getFullDate(this.props.log.return_date)}</span>
        </div>
        <div className="mt-5 d-flex flex-row">
          <span style={{fontSize: "23px"}}>Thank you for using our services. :)</span>
        </div>
      </div>
    )
  }
}

export default class Conclude extends Component {

  render() {
    return(
      <div className="d-flex w-100 my-5 justify-content-center">
        <Container>
          <Row>
            <Col lg={6} className="p-4">
              {this.props.controller.task === "rent" && <Rent {...this.props} />}
              {this.props.controller.task === "return" && <Return {...this.props} />}
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
