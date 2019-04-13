import { connect } from 'react-redux'
import {increaseStep,
      decreaseStep,
      resetController,
      resetRentLocker,
      resetChange,
      setTask,
      decreaseMoney,
      resetMoney,
      resetPayment } from '../actions'
import rent from '../components/rent'

const mapStateToProps = (state) => ({
  controller: state.controller,
  rentLocker: state.rentLocker,
  moneyslot: state.moneyslot,
  payment: state.payment
})

const mapDispatchToProps = {
  increaseStep,
  decreaseStep,
  resetController,
  resetRentLocker,
  resetChange,
  setTask,
  decreaseMoney,
  resetMoney,
  resetPayment
}

export default connect(mapStateToProps, mapDispatchToProps)(rent)
