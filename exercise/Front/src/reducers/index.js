import { combineReducers } from 'redux'
import controller from './controller'
import moneyslot from './moneyslot'
import payment from './payment'
import pin from './pin'
import rentLocker from './rentLocker'
import returnLocker from './returnLocker'

export default combineReducers({
  controller,
  moneyslot,
  payment,
  pin,
  rentLocker,
  returnLocker
})
