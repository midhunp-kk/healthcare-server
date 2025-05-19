import express from 'express'
import { getSchedules } from '../controllers/schedules.controller';

const router = express.Router()

router.get('/get', getSchedules);
// router.delete('/delete', deleteItem);
// router.patch('/update', updateValidator(), updateItem);


export { router }