import mongoose from 'mongoose'

var inuseSchema = new mongoose.Schema({
  rent_date: {type: String, default: () => { return new Date() }},
  pin: {type: Number, min: 100000, max: 999999, default: () => { return Math.floor(Math.random()*900000) + 100000 }},
  locker_number: {type: String, required: true},
})

export default mongoose.model('Inuse', inuseSchema)
