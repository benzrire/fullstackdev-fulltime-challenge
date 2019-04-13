import { connect } from 'react-redux'
import { resetMoney, decreaseMoney, setConfirm } from '../actions'
import confirm from '../components/confirm'

const mapStateToProps = (state) => ({
  moneyslot: state.moneyslot,
  rentLocker: state.rentLocker,
  returnLocker: state.returnLocker,
  controller: state.controller
})

const mapDispatchToProps = {
  resetMoney,
  decreaseMoney,
  setConfirm
}

export default connect(mapStateToProps, mapDispatchToProps)(confirm)
