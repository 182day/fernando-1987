// src/controllers/snailPayController.ts
import { Request, Response } from 'express';

export const processPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      mensaje: 'Pago procesado exitosamente',
    });

  } catch (error: any) {
    res.status(500).json({ 
      mensaje: 'Error en el servidor', 
      error: error.message || error 
    });
  }
};