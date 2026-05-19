import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './modules/auth/presentation/routes/auth.routes';
import cors from "cors"
const app = express();


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/auth",authRoutes);

export default app;