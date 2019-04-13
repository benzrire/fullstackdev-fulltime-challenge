import { SET_SELECTED, SET_RENT_LOCKER, RESET_RENT_LOCKER } from '../constraint'

const initState = {
  selected: false,
  locker: {
    locker_number: '',
    size: '',
    rent_fee: 0,
    next_fee: 0,
    fee_unit: 'THB'
  }
}

const rentLocker = (state = initState, action) => {
  switch (action.type) {
    case SET_SELECTED:
      return {
        selected: action.selected,
        locker: state.locker
      }
    case SET_RENT_LOCKER:
      return {
        selected: state.selected,
        locker: action.locker
      }
    case RESET_RENT_LOCKER:
      return initState
    default:
      return state
  }
}

export default rentLocker
