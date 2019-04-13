import { connect } from 'react-redux'
import { increaseMoney, decreaseMoney, resetMoney, resetChange } from '../actions'
import moneyslot from '../components/moneyslot'

const mapDispatchToProps = {
  increaseMoney,
  decreaseMoney,
  resetMoney,
  resetChange
}

const mapStateToProps = (state) => ({
  moneyslot: state.moneyslot,
  rentLocker: state.rentLocker
})

export default connect(mapStateToProps, mapDispatchToProps)(moneyslot)
