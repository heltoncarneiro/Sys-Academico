import bcrypt from 'bcryptjs';
import Professor from '../models/Professor.js';

export async function register(req, res) {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      return res.status(400).json({ message: 'nome, email e senha são obrigatórios.' });
    }
    const existing = await Professor.findOne({ email });
    if (existing) return res.status(409).json({ message: 'E-mail já cadastrado.' });

    const hash = await bcrypt.hash(senha, 10);
    const professor = await Professor.create({ nome, email, senha: hash });
    return res.status(201).json({ id: professor._id, nome: professor.nome, email: professor.email });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro no servidor.' });
  }
}

export async function login(req, res) {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ message: 'email e senha são obrigatórios.' });

    const professor = await Professor.findOne({ email });
    if (!professor) return res.status(401).json({ message: 'Credenciais inválidas.' });

    const ok = await bcrypt.compare(senha, professor.senha);
    if (!ok) return res.status(401).json({ message: 'Credenciais inválidas.' });

    return res.json({ id: professor._id, nome: professor.nome, email: professor.email });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro no servidor.' });
  }
}