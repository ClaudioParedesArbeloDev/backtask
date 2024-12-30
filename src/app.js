import express from 'express';
import mongoose from 'mongoose';
import tasksController from './controllers/tasks.controllers.js';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from '../swagger/swagger.js';



const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec))

app.use(express.json());

app.use(cors({
  origin: 'https://front-react-74n13t5uq-claudio-paredes-projects.vercel.app'  
}));

app.use('/api/tasks',tasksController)

const URL="mongodb+srv://claudioparedes:Cabeza2$@cluster1.rimje8x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"

mongoose.connect(URL, {
  dbName: 'task',
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(8080)
})
.catch((error) => {
  console.log("Error connecting to MongoDB", error);
});

