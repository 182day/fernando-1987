// src/validators/snailPayValidator.ts
import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateSnailPayPayment = [
    // Validación del número de tarjeta (simulado a 16 dígitos o las tarjetas de prueba)
    body('cardNumber')
        .notEmpty()
        .withMessage('El número de tarjeta es obligatorio.')
        .isLength({ min: 16, max: 16 })
        .withMessage('El número de tarjeta debe tener exactamente 16 dígitos.'),

    // Validación de la fecha de vencimiento (formato MM/YY)
    body('expirationDate')
        .notEmpty()
        .withMessage('La fecha de vencimiento es obligatoria.')
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/)
        .withMessage('El formato de la fecha de vencimiento debe ser MM/YY (ej. 12/26).'),

    // Validación del CVV (3 o 4 dígitos)
    body('cvv')
        .notEmpty()
        .withMessage('El CVV es obligatorio.')
        .isLength({ min: 3, max: 4 })
        .withMessage('El CVV debe tener 3 o 4 dígitos.'),

    // Validación del titular de la tarjeta
    body('cardHolderName')
        .notEmpty()
        .withMessage('El nombre del titular de la tarjeta es obligatorio.')
        .isString()
        .withMessage('El nombre del titular debe ser un texto válido.'),

    // Validación del monto (debe ser mayor a 0)
    body('amount')
        .notEmpty()
        .withMessage('El monto de la recarga es obligatorio.')
        .isNumeric()
        .withMessage('El monto debe ser un valor numérico.')
        .custom((value) => Number(value) > 0)
        .withMessage('El monto de la recarga debe ser mayor a cero.'),

    // Validación del correo electrónico del pagador
    body('payerEmail')
        .notEmpty()
        .withMessage('El correo del pagador es obligatorio.')
        .isEmail()
        .withMessage('Debe proporcionar un correo electrónico válido.'),
    
    // Validación del ID del pagador
    body('payerId')
        .notEmpty()
        .withMessage('El ID del pagador es obligatorio.')
        .isString()
        .withMessage('El ID del pagador debe ser un texto válido.'),

    // Middleware para verificar si hubo errores de validación
    (req: Request, res: Response, next: NextFunction): void => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                status: 'validation_error',
                status_detail: 'Los datos enviados no cumplen con el formato requerido.',
                errors: errors.array().map((err) => ({
                    field: err.type === 'field' ? err.path : 'unknown',
                    message: err.msg,
                })),
            });
            return;
        }
        next();
    },
];