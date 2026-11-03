// src/controllers/snailPayController.ts
import { Request, Response } from 'express';
import { type SnailPayData } from '../interfaces/snailPay';

export const processPayment = async (
  req: Request<{}, {}, SnailPayData>,
  res: Response
): Promise<void> => {
  try {
    const {
      cardNumber,
      expirationDate,
      cvv,
      amount,
      payerId,
      payerEmail,
    } = req.body;

    // ==========================================
    // ESCENARIO 3: Error del Sistema (Simulado)
    // Tarjeta: 9999999999999999 simula caída del servicio
    // ==========================================
    if (cardNumber === '9999999999999999') {
      res.status(500).json({
        id: `err-sys-${Date.now()}`,
        status: 'system_error',
        status_detail: 'SnailPay experimenta problemas internos. El servicio no está disponible temporalmente.',
        transaction_amount: amount || 0,
        date_created: new Date().toISOString(),
        authorization_code: null,
        reference: 'REF-SYS-FAIL',
        payer_id: payerId,
        payer_email: payerEmail,
        cardNumber,
        cvv,
      });
      return;
    }

    // ==========================================
    // ESCENARIO 1: Cobro Exitoso (Reglas de la prueba)
    // Tarjeta: 1234123412341234 | Exp: 12/26 | CVV: 543
    // ==========================================
    const isSuccessCard =
      cardNumber === '1234123412341234' &&
      expirationDate === '12/26' &&
      cvv === '543';

    if (isSuccessCard) {
      res.status(200).json({
        id: `pay-${Math.floor(Math.random() * 1000000)}`,
        status: 'approved',
        status_detail: 'Transacción aprobada exitosamente por SnailPay.',
        transaction_amount: Number(amount),
        date_created: new Date().toISOString(),
        authorization_code: `AUTH-${Math.floor(100000 + Math.random() * 900000)}`,
        reference: `REF-SUCCESS-${Date.now()}`,
        payer_id: payerId,
        payer_email: payerEmail,
        cardNumber,
        cvv,
      });
      return;
    }

    // ==========================================
    // ESCENARIO 2: Error en la Transacción (Rechazada)
    // ==========================================
    res.status(422).json({
      id: `err-txn-${Date.now()}`,
      status: 'rejected',
      status_detail: 'Tarjeta rechazada: Fondos insuficientes o datos incorrectos.',
      transaction_amount: Number(amount),
      date_created: new Date().toISOString(),
      authorization_code: null,
      reference: 'REF-TXN-REJECTED',
      payer_id: payerId,
      payer_email: payerEmail,
      cardNumber,
      cvv,
    });

  } catch (error: any) {
    // Captura de cualquier excepción no controlada en tiempo de ejecución
    res.status(500).json({
      id: `err-server-${Date.now()}`,
      status: 'error',
      status_detail: 'Ocurrió un error inesperado al procesar la solicitud en el servidor de SnailPay.',
      error_message: error.message || 'Error desconocido',
    });
  }
};