import React, { Component } from 'react'
import Request from 'es6-request'
import '../App.css'
import { GET_LOCKER_DETAIL, GET_LOCKER_INUSE } from '../constraint'
import { Container, Row, Col } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Card } from 'react-bootstrap'
import { Table } from 'react-bootstrap'
import { ListGroup } from 'react-bootstrap'

export default class Locker extends Component {

  _isMounted = false;

  state = {
    lockerDetail: [],
    lockerInuse: []
  }

  componentDidMount() {
    this._isMounted = true;
    this.props.socket.on('inprogress list', (list) => {
      this.requestData()
    })
    this.props.socket.on('refresh', () => {
      this.requestData()
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  requestData = () => {
    Request.get(GET_LOCKER_DETAIL).then(([body, res]) => {
      if(this._isMounted) {
        this.setState({ lockerDetail: JSON.parse(body) })
      }
    })
    Request.get(GET_LOCKER_INUSE).then(([body, res]) => {
      if(this._isMounted) {
        this.setState({ lockerInuse: JSON.parse(body) })
      }
    })
  }

  selectLocker = (event, locker_number, size, rent_fee, next_fee, fee_unit) => {
    if(this.isAvailable(locker_number) && !this.isSelected(locker_number)) {
      this.props.setSelected(true)
      this.props.setRentLocker({locker_number, size, rent_fee, next_fee, fee_unit})
    }
    if(this.isSelected(locker_number)) {
      this.props.resetRentLocker()
    }
  }

  isUnavailable = locker_number => {
    let unavailableLockers = []
    this.state.lockerInuse.forEach(inuse => {
      unavailableLockers.push(inuse.locker_number)
    })
    return unavailableLockers.includes(locker_number)
  }

  isInprogress = locker_number => {
    return this.props.inprogress.includes(locker_number)
  }

  isAvailable = locker_number => {
    return (
      !this.isUnavailable(locker_number) && !this.isInprogress(locker_number)
    )
  }

  isSelected = (locker_number) => {
    return this.props.rentLocker.selected && this.props.rentLocker.locker.locker_number === locker_number
  }

  render() {
    return (
      <div className="pb-5">
        <Container className="my-5">
          <Row>
            <Col>
              <span style={{ fontSize: "20px" }}>Charge table</span>
            </Col>
          </Row>
          <Row>
            <Col>
              <span style={{ fontSize: "13px" }} className="text-muted">
                The charge of locker usage is based on unit size and time usage.
              </span>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <div style={{maxHeight: '30vh'}} className="overflow-auto">
                <Table striped borderless responsive>
                  <thead>
                    <tr>
                      <th>Locker size</th>
                      <th>First hour charge</th>
                      <th>Next hour charge</th>
                      <th>Locker numbers</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.lockerDetail.map((locker, index) =>
                      <tr key={"tblocker-" + index}>
                        <td>{locker.size}</td>
                        <td>{locker.rent_fee} {locker.fee_unit}</td>
                        <td>{locker.next_fee} {locker.fee_unit}</td>
                        <td>{locker.locker_number}</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <span style={{ fontSize: "20px" }}>Select a locker</span>
            </Col>
          </Row>
          <Row>
            <Col>
              <span style={{ fontSize: "13px" }} className="text-muted">
                Can not select the locker that unavailable and inprogress.
              </span>
            </Col>
          </Row>
          <Row className="justify-content-center">
            {this.state.lockerDetail.map((locker, index) => (
              <Col lg={3} key={"locker-" + index}>
                <Card key={locker.locker_number}
                  className={(this.isAvailable(locker.locker_number) ? "shadow " : "") + "my-3"}
                  style={locker.size === "S" ? {minHeight: '150px'} : (locker.size === "M" ? {minHeight: '180px'} : {minHeight: '200px'})}>
                  <Card.Body
                    onClick={event => this.selectLocker(event, locker.locker_number, locker.size, locker.rent_fee, locker.next_fee, locker.fee_unit)}
                    className={
                      (this.isUnavailable(locker.locker_number) || this.isInprogress(locker.locker_number) ? "not-allowed " : "allowed ") +
                      (this.isSelected(locker.locker_number) ? "selected " : "")}>
                    <Card.Text className="d-flex flex-column h-100">
                      <span style={{ fontSize: "20px" }} className={this.isUnavailable(locker.locker_number) ? "text-secondary" : ""}>
                        {locker.locker_number}
                      </span>
                      {this.isUnavailable(locker.locker_number) && (
                        <span className="mt-auto text-black-50">
                          UNAVAILABLE
                        </span>
                      )}
                      {this.isInprogress(locker.locker_number) && (
                        <span className="mt-auto text-black-50">
                          INPROGRESS
                        </span>
                      )}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Row className="mt-5">
            <Col>
              <span style={{ fontSize: "20px" }}>Realtime data</span>
            </Col>
          </Row>
          <Row>
            <Col>
              <span style={{ fontSize: "13px" }} className="text-muted">
                The realtime data contains available lockers, unavailable lockers, and inprogress lockers.
              </span>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col lg={4}>
              <Button variant="info" className="btn-block mb-2" data-toggle="collapse" data-target="#available-locker" aria-expanded="false" aria-controls="available-locker">Available locker(s)</Button>
              <ListGroup className="collapse" id="available-locker">
                {this.state.lockerDetail.map((locker) => (
                  this.isAvailable(locker.locker_number) && <ListGroup.Item key={"a-" + locker.locker_number}>{locker.locker_number}</ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col lg={4}>
              <Button variant="info" className="btn-block mb-2" data-toggle="collapse" data-target="#unavailable-locker" aria-expanded="false" aria-controls="unavailable-locker">Unavailable locker(s)</Button>
              <ListGroup className="collapse" id="unavailable-locker">
                {this.state.lockerDetail.map((locker) => (
                  this.isUnavailable(locker.locker_number) && <ListGroup.Item key={"u-" + locker.locker_number}>{locker.locker_number}</ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col lg={4}>
              <Button variant="info" className="btn-block mb-2" data-toggle="collapse" data-target="#inprogress-locker" aria-expanded="false" aria-controls="inprogress-locker">Inprogress locker(s)</Button>
              <ListGroup className="collapse" id="inprogress-locker">
                {this.state.lockerDetail.map((locker) => (
                  this.isInprogress(locker.locker_number) && <ListGroup.Item key={"i-" + locker.locker_number}>{locker.locker_number}</ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
