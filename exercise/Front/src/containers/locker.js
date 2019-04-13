import { connect } from 'react-redux'
import { setSelected, setRentLocker, resetRentLocker } from '../actions'
import locker from '../components/locker'

const mapDispatchToProps = {
  setSelected,
  setRentLocker,
  resetRentLocker
}

const mapStateToProps = (state) => ({
  rentLocker: state.rentLocker
})

export default connect(mapStateToProps, mapDispatchToProps)(locker)
