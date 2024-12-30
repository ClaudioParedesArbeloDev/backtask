import express from 'express';
import mongoose from 'mongoose';
import tasksController from './controllers/tasks.controllers.js';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from '../swagger/swagger.js';

dotenv.config();

const URL = process.env.URL;

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec))

app.use(express.json());

app.use(cors());

app.use('/api/tasks',tasksController)


mongoose.connect(URL, {
  dbName: 'task',
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(8080 || 3000)
})
.catch((error) => {
  console.log("Error connecting to MongoDB", error);
});

