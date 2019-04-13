import mongoose from 'mongoose'

var lockerSchema = new mongoose.Schema({
  size: {type: String, required: true},
  rent_fee: {type: Number, min: 0, required: true},
  next_fee: {type: Number, min: 0, required: true},
  fee_unit: {type: String, uppercase: true, default: 'THB'},
  locker_number: {type: String, required: true},
})

export default mongoose.model('Locker', lockerSchema)
