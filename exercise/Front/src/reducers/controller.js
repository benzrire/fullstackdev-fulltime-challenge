import { RESET_CONTROLLER, SET_TASK, INCREASE_STEP, DECREASE_STEP } from '../constraint'

const initState = {
  task: 'home',
  step: 0
}

const controller = (state = initState, action) => {
  switch (action.type) {
    case SET_TASK:
      return {
        task: action.task,
        step: state.step
      }
    case INCREASE_STEP:
      return {
        task: state.task,
        step: state.step + 1
      }
    case DECREASE_STEP:
      return {
        task: state.task,
        step: state.step - 1
      }
    case RESET_CONTROLLER:
      return initState
    default:
      return state
  }
}

export default controller
