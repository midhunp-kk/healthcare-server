import mongoose from 'mongoose';
import { ENV } from './env';

export default async function connectDB() {
    if (!ENV.MONGO_URI) {
        console.error('MongoDB URI is missing from environment variables');
        throw new Error('No MONGODB URI');
    }

    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(ENV.MONGO_URI);
        console.log('✅ MongoDB connected!');
    } catch (e) {
        console.error('Error connecting to MongoDB', e);
        throw e;
    }
}