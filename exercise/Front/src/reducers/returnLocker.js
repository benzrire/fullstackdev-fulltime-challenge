import { SET_INUSED, SET_INUSE, SET_RETURN_LOCKER, RESET_RETURN_LOCKER } from '../constraint'

const initState = {
  inused: false,
  inuse: {
    pin: '',
    rent_date: '',
    locker_number: ''
  },
  locker: {
    locker_number: '',
    size: '',
    rent_fee: 0,
    next_fee: 0,
    fee_unit: 'THB'
  }
}

const returnLocker = (state = initState, action) => {
  switch (action.type) {
    case SET_INUSED:
      return {
        inused: action.inused,
        inuse: state.inuse,
        locker: state.locker
      }
    case SET_INUSE:
      return {
        inused: state.inused,
        inuse: action.inuse,
        locker: state.locker
      }
    case SET_RETURN_LOCKER:
      return {
        inused: state.inused,
        inuse: state.inuse,
        locker: action.locker
      }
    case RESET_RETURN_LOCKER:
      return initState
    default:
      return state
  }
}

export default returnLocker
