import { Router } from 'express'
import LockerController from '../controllers/locker'

const router = Router()
const lockerCtrl = new LockerController()

router.post('/', lockerCtrl.getLocker)
router.get('/', lockerCtrl.getLockerList)
router.post('/create', lockerCtrl.createLocker)

export default router
