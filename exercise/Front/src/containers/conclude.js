import { connect } from 'react-redux'
import conclude from '../components/conclude'

const mapStateToProps = (state) => ({
  returnLocker: state.returnLocker,
  rentLocker: state.rentLocker,
  controller: state.controller,
  moneyslot: state.moneyslot
})

export default connect(mapStateToProps)(conclude)
