import * as c from '../constraint'

// Controller
export const setTask = (task) => ({
  type: c.SET_TASK,
  task
})

export const increaseStep = () => ({
  type: c.INCREASE_STEP
})

export const decreaseStep = () => ({
  type: c.DECREASE_STEP
})

export const resetController = () => ({
  type: c.RESET_CONTROLLER
})

// Money slot
export const increaseMoney = (money) => ({
  type: c.INCREASE_MONEY,
  money
})

export const decreaseMoney = (money) => ({
  type: c.DECREASE_MONEY,
  money
})

export const resetMoney = () => ({
  type: c.RESET_MONEY
})

export const resetChange = () => ({
  type: c.RESET_CHANGE
})

// Payment
export const setConfirm = (confirmed) => ({
  type: c.SET_CONFIRM,
  confirmed
})

export const resetPayment = () => ({
  type: c.RESET_PAYMENT
})

// Pin
export const setNumber = (number) => ({
  type: c.SET_NUMBER,
  number
})

export const resetPin = () => ({
  type: c.RESET_PIN
})

// Rent Locker
export const setSelected = (selected) => ({
  type: c.SET_SELECTED,
  selected
})

export const setRentLocker = (locker) => ({
  type: c.SET_RENT_LOCKER,
  locker
})

export const resetRentLocker = () => ({
  type: c.RESET_RENT_LOCKER
})

// Return Locker
export const setInused = (inused) => ({
  type: c.SET_INUSED,
  inused
})

export const setInuse = (inuse) => ({
  type: c.SET_INUSE,
  inuse
})

export const setReturnLocker = (locker) => ({
  type: c.SET_RETURN_LOCKER,
  locker
})

export const resetReturnLocker = () => ({
  type: c.RESET_RETURN_LOCKER
})
