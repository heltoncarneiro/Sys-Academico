import mongoose from 'mongoose';

export async function connectToDatabase() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/sys-academico';
  mongoose.set('strictQuery', true);
  await mongoose.connect(mongoUri, {
    dbName: mongoUri.split('/').pop(),
  });
  console.log('Conectado ao MongoDB');
}