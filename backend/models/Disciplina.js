import mongoose from 'mongoose';

const DisciplinaSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    cargaHoraria: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Disciplina', DisciplinaSchema);