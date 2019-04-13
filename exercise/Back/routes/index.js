import { Router } from 'express'
import locker from './locker'
import inuse from './inuse'
import log from './log'

const router = Router()

router.use('/locker', locker)
router.use('/inuse', inuse)
router.use('/log', log)

export default router
