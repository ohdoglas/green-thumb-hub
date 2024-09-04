import 'dotenv/config';
import express, { Application } from "express";
import routes from "../src/router";
import cors from 'cors';

const app: Application = express();

app.use(cors({
    origin: 'http://localhost:3001',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json());
app.use(routes);

export default app;