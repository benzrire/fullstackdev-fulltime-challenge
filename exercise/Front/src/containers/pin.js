import { connect } from 'react-redux'
import { setNumber, resetPin } from '../actions'
import pin from '../components/pin'

const mapStateToProps = (state) => ({
  pin: state.pin
})

const mapDispatchToProps = {
  setNumber,
  resetPin
}

export default connect(mapStateToProps, mapDispatchToProps)(pin)
