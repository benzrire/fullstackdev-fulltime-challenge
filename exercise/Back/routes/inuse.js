import { Router } from 'express'
import { getInuse, getInuseList, createInuse, removeInuse } from '../controllers/inuse'

const router = Router()

router.get('/', getInuseList)
router.post('/', getInuse)
router.post('/create', createInuse)
router.post('/remove', removeInuse)

export default router
