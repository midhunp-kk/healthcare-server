import express from 'express';
import { router as userRoute } from '@/src/routes/sample.routes';
import { router as staffRoute } from '@/src/routes/staff.routes';

const router = express.Router()

router.use('/user', userRoute)
router.use('/staff', staffRoute)

export { router as routers };