import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './modules/auth/presentation/routes/auth.routes';
import hospitalRoute from "./modules/hospital/presentation/routes/hospital.routes"

import specializationRoute from "../src/modules/specialization/presentation/routes/specialization.routes"

import cors from "cors"
import { errorHandler } from './shared/middleware/errrorHandler';
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

app.use('/hospital',hospitalRoute)

//SpecializationRoute
app.use('/specializations',specializationRoute);



// Error Handling MiddlWare

app.use(errorHandler);
export default app;