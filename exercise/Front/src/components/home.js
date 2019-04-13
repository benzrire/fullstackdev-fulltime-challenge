import React, { Component } from 'react'
import Rent from '../containers/rent'
import Return from '../containers/returns'
import { PROJECT_NAME, USER_CONDITION, TECHNOLOGIES } from '../constraint'
import { Container, Row, Col } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

export default class Home extends Component {

  rentHandle = (event) => {
    this.props.setTask("rent")
  }

  returnHandle = (event) => {
    this.props.setTask("return")
  }

  render() {

    const btnStyle = {
      height: "10vh",
      fontSize: "3vh"
    }

    const Homepage = (
      <Container>
        <Row style={{minHeight: "80vh"}} className="justify-content-center align-items-center">
          <Col lg={3} className="mr-5">
            <Row>
              <Col className="pb-3">
                <Button onClick={(event) => this.rentHandle(event)} variant="outline-info" className="btn-block px-4" style={btnStyle}>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Rent</span>
                    <div>
                      <i className="fas fa-inbox mr-2"></i><i className="fas fa-arrow-left"></i>
                    </div>
                  </div>
                </Button>
              </Col>
            </Row>
            <Row>
              <Col className="pt-3">
                <Button onClick={(event) => this.returnHandle(event)} variant="outline-info" className="btn-block px-4" style={btnStyle}>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Return</span>
                      <div>
                        <i className="fas fa-inbox mr-2"></i><i className="fas fa-arrow-right"></i>
                      </div>
                  </div>
                </Button>
              </Col>
            </Row>
          </Col>
          <Col lg={7} className="text-left ml-5">
            <span style={{fontSize: "4vh"}}>{PROJECT_NAME}</span>
            <ul className="list-unstyled mt-5">
              <li className="mt-3"><span>User condition</span></li>
              <li>
                <ul>
                  {USER_CONDITION.map((userCond, index) => <li key={'userCond-' + index}><small>{userCond}</small></li> )}
                </ul>
              </li>
              <li className="mt-3"><span>Technologies</span></li>
              <li>
                <ul>
                  {TECHNOLOGIES.map((tech, index) => <li key={'tech-' + index}><small>{tech}</small></li>)}
                </ul>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    )

    return(
      <div>
        {this.props.controller.task === "rent" ? <Rent /> : this.props.controller.task === "return" ? <Return /> : Homepage}
      </div>
    )
  }

}
