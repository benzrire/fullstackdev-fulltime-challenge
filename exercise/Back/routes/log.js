import { Router } from 'express'
import LogController from '../controllers/log'

const router = Router()
const logCtrl = new LogController()

router.get('/', logCtrl.getLogList)
router.post('/', logCtrl.getLog)
router.post('/create', logCtrl.createLog)

export default router
