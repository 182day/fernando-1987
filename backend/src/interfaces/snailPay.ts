// src/interfaces/snailPay.ts
export interface SnailPayData {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  cardHolderName: string;
  amount: number;
  payerId: string;
  payerEmail: string;
}