import Log from '../models/log'

export default class LogController {

  constructor() {
    this.getLogList = this.getLogList.bind(this)
    this.getLog = this.getLog.bind(this)
    this.createLog = this.createLog.bind(this)
  }

  async getLogList(req, res) {
    const logs = await Log.find()
    res.json(logs)
  }

  async getLog(req, res) {
    const log = await Log.findOne(req.body)
    let ret = {
      error: true,
      message: "Default log message.",
      log: null
    }
    if(log === null) {
      ret = {
        error: true,
        message: "Log not found.",
        log: null
      }
    }else {
      ret = {
        error: false,
        message: "Found the log.",
        log: log
      }
    }
    res.json(ret)
  }

  async createLog(req, res) {
    const log = new Log(req.body)
    const saveLog = await log.save()
    res.json(log)
  }

}
