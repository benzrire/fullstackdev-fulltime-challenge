import Inuse from '../models/inuse'
import { comparison } from './sort_method'

export const getInuseList = async (req, res) => {
  const inuses = await Inuse.find()
  inuses.sort(comparison("_id"))
  res.json(inuses)
}

export const getInuse = async (req, res) => {
  const inuse = await Inuse.findOne(req.body)
  let ret = {
    error: true,
    message: "Default inuse message.",
    inuse: null
  }
  if(inuse === null) {
    ret = {
      error: true,
      message: "Inuse not found.",
      inuse: null
    }
  }else {
    ret = {
      error: false,
      message: "Found the inuse.",
      inuse: inuse
    }
  }
  res.json(ret)
}

export const createInuse = async (req, res) => {
  const inuse = new Inuse(req.body)
  const saveInuse = await inuse.save()
  res.json(inuse)
}

export const removeInuse = async (req, res) => {
  const inuse = await Inuse.findOne(req.body)
  let ret = {
    error: true,
    message: "Default inuse message.",
    inuse: null
  }
  if(inuse === null) {
    ret = {
      error: true,
      message: "Inuse not found.",
      inuse: null
    }
  }else {
    const removeInuse = await inuse.remove()
    ret = {
      error: false,
      message: "Inuse removed",
      inuse: inuse
    }
  }
  res.json(ret)
}
