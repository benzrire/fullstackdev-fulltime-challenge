import { INCREASE_MONEY, DECREASE_MONEY, RESET_MONEY, RESET_CHANGE } from '../constraint'

const initState = {
  money: 0,
  change: 0
}

const moneyslot = (state = initState, action) => {
  switch (action.type) {
    case INCREASE_MONEY:
      return {
        money: state.money + action.money,
        change: state.change
      }
    case DECREASE_MONEY:
      return {
        money: state.money - action.money,
        change: state.change
      }
    case RESET_MONEY:
      return {
        money: 0,
        change: state.change + state.money
      }
    case RESET_CHANGE:
      return {
        money: state.money,
        change: 0
      }
    default:
      return state
  }
}

export default moneyslot
