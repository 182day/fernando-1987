import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import snailPayRoutes from './routes/snailPayRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

// Configuras CORS para aceptar peticiones desde la URL de tu frontend definida en .env
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));

app.use(express.json());

// Rutas de SnailPay
app.use('/api/snailpay', snailPayRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API del Sistema de Caracoles y SnailPay funcionando correctamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://${HOST}:${PORT}`);
});