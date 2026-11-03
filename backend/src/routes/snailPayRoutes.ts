// src/routes/snailPayRoutes.ts
import { Router } from 'express';
import { processPayment } from '../controllers/snailPayController';
import { validateSnailPayPayment } from '../middlewares/validators/snailPayValidator';

const router = Router();

// Endpoint con validador de express-validator previo al controlador
router.post('/process', validateSnailPayPayment, processPayment);

export default router;