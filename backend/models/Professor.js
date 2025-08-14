import mongoose from 'mongoose';

const ProfessorSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Professor', ProfessorSchema);