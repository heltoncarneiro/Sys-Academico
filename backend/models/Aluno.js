import mongoose from 'mongoose';

const AlunoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    endereco: { type: String },
    dataNascimento: { type: String },
    cpf: { type: String },
    matricula: { type: String, unique: true, index: true },
    telefone: { type: String },
    email: { type: String },
    curso: { type: String },
  },
  { timestamps: true }
);

AlunoSchema.pre('save', function(next){
  if(!this.matricula){
    const now = new Date()
    const y = now.getFullYear().toString()
    const m = String(now.getMonth()+1).padStart(2,'0')
    const d = String(now.getDate()).padStart(2,'0')
    const rand = Math.floor(1000 + Math.random()*9000)
    this.matricula = `${y}${m}${d}${rand}`
  }
  next()
})

export default mongoose.model('Aluno', AlunoSchema);