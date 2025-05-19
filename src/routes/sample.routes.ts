import express from 'express'
import { createData, deleteItem, getData, updateItem } from '../controllers/sample.controller';
import { createValidator, updateValidator } from '../middlewares/sample.middleware';

const router = express.Router()

router.get('/get', getData);
router.post('/create', createValidator(), createData);
router.delete('/delete', deleteItem);
router.patch('/update', updateValidator(), updateItem);


export { router }