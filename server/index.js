import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import kpiRoutes from './routes/kpi.js'
import KPI from './models/KPI.js'
import {kpis} from './data/data.js'


// Configurations

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());


// api routes

app.use("/kpi", kpiRoutes);

// Mongoose Setup
const PORT = process.env.PORT || 9000;

const mongoConnect = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("Connected to mongoDB!")
      } catch (error) {
        console.log(error);
      }
    
      // await mongoose.connection.db.dropDatabase();
      // KPI.insertMany(kpis);
};

app.listen(PORT, () =>{
    mongoConnect();
    console.log("Backend server is running!");
})