// src/routes/snailPayRoutes.ts
import { Router } from 'express';
import { processPayment } from '../controllers/snailPayController';

const router = Router();

// Endpoint para procesar el pago / recarga con SnailPay
router.get('/process', processPayment);

export default router;