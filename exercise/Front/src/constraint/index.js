// Home
export const PROJECT_NAME = 'I GEAR GEEK: Coin Locker (コインロッカー)'
export const USER_CONDITION = [
  'Can insert coin: 1 THB, 2 THB, 5 THB, and 10 THB',
  'Can insert bill: 20 THB, 50 THB, 100 THB, 500 THB and 1000 THB',
  'Can\'t select the same locker with other users in Realtime.'
]
export const TECHNOLOGIES = [
  'CSS Framework : Bootstrap',
  'Frontend : React',
  'Backend : Node.js RESTful API',
  'Database : MongoDB Atlas'
]

// Locker
export const GET_LOCKER_DETAIL = 'http://127.0.0.1:5001/locker'
export const GET_LOCKER_INUSE = 'http://127.0.0.1:5001/inuse'

// Phone
export const PHONE_NUMBER_POLICY = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Nulla ac ante in orci vulputate bibendum efficitur a risus.',
  'Nullam sit amet dolor lacinia, fermentum ante sed, aliquam sem.',
  'Fusce pulvinar arcu aliquam, volutpat dui at, ultricies sapien.',
  'Nullam in ligula in nibh venenatis euismod at et est.',
  'Aliquam ac augue porta, dictum arcu ut, mattis elit.',
  'Etiam ultricies eros vel sapien varius, vitae pellentesque risus malesuada.',
  'Etiam venenatis velit viverra, tincidunt sem eu, aliquam ante.',
  'Fusce a ex volutpat, convallis nunc vitae, posuere erat.'
]

// Rent
export const POST_CREATE_INUES = 'http://127.0.0.1:5001/inuse/create'

// Return
export const POST_REMOVE_INUSE = 'http://127.0.0.1:5001/inuse/remove'
export const POST_CREATE_LOG = 'http://127.0.0.1:5001/log/create'

/*********************
* REDUCER CONSTRAINT *
*********************/

// Controller
export const SET_TASK = 'SET_TASK'
export const INCREASE_STEP = 'INCREASE_STEP'
export const DECREASE_STEP = 'DECREASE_STEP'
export const RESET_CONTROLLER = 'RESET_CONTROLLER'

// Rent Locker
export const SET_SELECTED = 'SET_SELECTED'
export const SET_RENT_LOCKER = 'SET_RENT_LOCKER'
export const RESET_RENT_LOCKER = 'RESET_RENT_LOCKER'

// Return Locker
export const SET_INUSED = 'SET_INUSED'
export const SET_INUSE = 'SET_INUSE'
export const SET_RETURN_LOCKER = 'SET_RETURN_LOCKER'
export const RESET_RETURN_LOCKER = 'RESET_RETURN_LOCKER'

// Pin
export const SET_NUMBER = 'SET_NUMBER'
export const RESET_PIN = 'RESET_PIN'

// Money slot
export const INCREASE_MONEY = 'INCREASE_MONEY'
export const DECREASE_MONEY = 'DECREASE_MONEY'
export const RESET_MONEY = 'RESET_MONEY'
export const RESET_CHANGE = 'RESET_CHANGE'

// Payment
export const SET_CONFIRM = 'SET_CONFIRM'
export const RESET_PAYMENT = 'RESET_PAYMENT'

// Date methods
export const getDifferenceDate = (current, start) => {
  const difference = Math.abs((new Date(current)) - (new Date(start))) / 36e5
  return Math.ceil(difference - 1).toString()
}

export const getFullDate = (date) => {
  const months = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
  let d = new Date(date);
  return months[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear() + " "
    + (d.getHours() < 10 ? "0" + d.getHours() : d.getHours()) + ":"
    + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes())
}
