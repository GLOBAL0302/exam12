import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './config';
import usersRouter from './routers/usersRouter';
import mealsRouter from './routers/mealsRouter';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/users', usersRouter);
app.use('/meals', mealsRouter);

const run = async () => {
  await mongoose.connect(config.db);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  process.on('exit', () => {
    mongoose.disconnect();
  });
};
run().catch((e) => console.error(e));
