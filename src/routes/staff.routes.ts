import express from 'express'
// import { createData, deleteItem, getData, updateItem } from '../controllers/sample.controller';
import { getData, addSchedule } from '../controllers/staff.controller';
import { createValidator } from '../middlewares/staff.middleware';

const router = express.Router()

router.get('/get', getData);
router.post('/add-schedule', createValidator(), addSchedule);
// router.delete('/delete', deleteItem);
// router.patch('/update', updateValidator(), updateItem);


export { router }