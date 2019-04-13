import { SET_NUMBER, RESET_PIN } from '../constraint'

const initState = {
  number: ['','','','','','']
}

const pin = (state = initState, action) => {
  switch (action.type) {
    case SET_NUMBER:
      return {
        number: action.number
      }
    case RESET_PIN:
      return initState
    default:
      return state
  }
}

export default pin
