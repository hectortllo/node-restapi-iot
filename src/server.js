import  express, { json } from 'express';

const app = express();

// importing routes
import IndexRoutes from "./routes/index.routes";
import ParkingRoutes from "./routes/parking.routes";

// Settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
// routes
app.use(IndexRoutes);
app.use('/parking', ParkingRoutes);
export default app;