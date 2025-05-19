import express from 'express';
import { router as staffRoute } from '@/src/routes/staff.routes';
import { router as scheduleRoute } from '@/src/routes/schedule.routes';

const router = express.Router()

router.use('/staff', staffRoute)
router.use('/schedule', scheduleRoute)

export { router as routers };