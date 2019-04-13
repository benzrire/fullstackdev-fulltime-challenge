import mongoose from 'mongoose'

var logSchema = new mongoose.Schema({
  locker_number: {type: String, required: true},
  rent_date: {type: String, default: () => { return new Date() }},
  return_date: {type: String, default: () => { return new Date() }},
  pin: {type: Number, min: 100000, max: 999999, required: true},
})

export default mongoose.model('Log', logSchema)
