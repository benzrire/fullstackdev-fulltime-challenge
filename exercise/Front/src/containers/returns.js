import { connect } from 'react-redux'
import { increaseStep,
  decreaseStep,
  resetController,
  setTask,
  setReturnLocker,
  resetReturnLocker,
  resetPin,
  setInuse,
  setInused,
  decreaseMoney,
  resetMoney,
  resetChange,
  resetPayment } from '../actions'
import returns from '../components/returns'

const mapDispatchToProps = {
  increaseStep,
  decreaseStep,
  resetController,
  setTask,
  setReturnLocker,
  resetReturnLocker,
  resetPin,
  setInuse,
  setInused,
  decreaseMoney,
  resetMoney,
  resetChange,
  resetPayment
}

const mapStateToProps = (state) => ({
  controller: state.controller,
  pin: state.pin,
  payment: state.payment,
  returnLocker: state.returnLocker
})

export default connect(mapStateToProps, mapDispatchToProps)(returns)
