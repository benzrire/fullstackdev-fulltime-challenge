import Locker from '../models/locker'
import { comparison } from './sort_method'

export default class LockerController {

  constructor() {
    this.getLockerList = this.getLockerList.bind(this)
    this.createLocker = this.createLocker.bind(this)
  }

  async getLockerList(req, res) {
    const lockers = await Locker.find()
    lockers.sort(comparison("_id"))
    res.json(lockers)
  }

  async createLocker(req, res) {
    const locker = new Locker(req.body)
    const saveLocker = await locker.save()
    res.json(locker)
  }

  async getLocker(req, res) {
    const locker = await Locker.findOne(req.body)
    let ret = {
      error: true,
      message: "Default locker message.",
      locker: null
    }
    if(locker === null) {
      ret = {error: true, message: "Locker not found.", locker: null}
    }else {
      ret = {error: false, message: "Found the locker.", locker: locker}
    }
    res.json(ret)
  }
}
