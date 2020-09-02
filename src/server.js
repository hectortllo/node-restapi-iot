import  express, { json } from 'express';

const app = express();

// importing routes
import IndexRoutes from "./routes/index.routes";
import ParkingRoutes from "./routes/parking.routes";

// Settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(json());

// routes
app.use(IndexRoutes);
app.use('/parking', ParkingRoutes);
export default app;