import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import alunoRoutes from './routes/alunoRoutes.js';
import disciplinaRoutes from './routes/disciplinaRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ status: 'ok', name: 'Sys-Acadêmico API' });
});

app.use('/auth', authRoutes);
app.use('/alunos', alunoRoutes);
app.use('/disciplinas', disciplinaRoutes);

const PORT = process.env.PORT || 5000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1);
  });