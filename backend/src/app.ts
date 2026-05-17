import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './modules/auth/presentation/routes/auth.routes';

const app = express();



app.use(cookieParser());
app.use(express.json());
app.use("/auth",authRoutes);

export default app;