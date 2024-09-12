import 'dotenv/config';
import express, { Application } from "express";
import routes from "../src/router";
import cors from 'cors';

const PORT = process.env.PORT
const app: Application = express();

app.set('trust proxy', true);

app.use(cors({
    origin: `http://localhost:3000`,
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
}));

app.use(express.json());

app.use(routes);

export default app;