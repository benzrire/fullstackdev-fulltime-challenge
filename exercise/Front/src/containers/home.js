import { connect } from 'react-redux'
import { setTask } from '../actions'
import home from '../components/home'

const mapDispatchToProps = {
  setTask
}

const mapStateToProps = (state) => ({
  controller: state.controller
})

export default connect(mapStateToProps, mapDispatchToProps)(home)
