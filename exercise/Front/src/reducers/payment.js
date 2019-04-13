import { SET_CONFIRM, RESET_PAYMENT } from '../constraint'

const initState = {
  confirmed: false
}

const payment = (state = initState, action) => {
  switch (action.type) {
    case SET_CONFIRM:
      return {
        confirmed: action.confirmed
      }
    case RESET_PAYMENT:
      return initState
    default:
      return state
  }
}

export default payment
