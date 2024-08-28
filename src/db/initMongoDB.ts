import mongoose from 'mongoose';
import { env } from '../utils/env.js';

export const initMongoDB = async () => {
  try {
    const user = env('DB_USERNAME');
    const pass = env('DB_PASS');
    const url = env('DB_URL');
    const db = env('DB_TABLE');

    await mongoose.connect(
      `mongodb+srv://${user}:${pass}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`,
    );

    console.log('Connection to MongoDB is successfully');
  } catch (e) {
    console.log('Some error occured while connect to MongoDB', e);
    throw e;
  }
};
