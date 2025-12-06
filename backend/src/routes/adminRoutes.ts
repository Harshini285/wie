import express from 'express';
import { createAdmin } from '../controllers/adminController';

const router = express.Router();

router.post('/', createAdmin);

export default router;
