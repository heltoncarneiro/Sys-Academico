import mongoose from 'mongoose';

const AlunoDisciplinaSchema = new mongoose.Schema(
  {
    idAluno: { type: mongoose.Schema.Types.ObjectId, ref: 'Aluno', required: true },
    idDisciplina: { type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina', required: true },
  },
  { timestamps: true }
);

AlunoDisciplinaSchema.index({ idAluno: 1, idDisciplina: 1 }, { unique: true });

export default mongoose.model('AlunoDisciplina', AlunoDisciplinaSchema);