import Disciplina from '../models/Disciplina.js';

export async function listDisciplinas(req, res) {
  try {
    const disciplinas = await Disciplina.find().sort({ createdAt: -1 });
    res.json(disciplinas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
}

export async function createDisciplina(req, res) {
  try {
    const { nome, cargaHoraria } = req.body;
    if (!nome || cargaHoraria === undefined) {
      return res.status(400).json({ message: 'nome e cargaHoraria são obrigatórios.' });
    }
    const disciplina = await Disciplina.create({ nome, cargaHoraria });
    res.status(201).json(disciplina);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
}

export async function updateDisciplina(req, res) {
  try {
    const { nome, cargaHoraria } = req.body;
    if (nome === '' || cargaHoraria === '') {
      return res.status(400).json({ message: 'Campos inválidos.' });
    }
    const disciplina = await Disciplina.findByIdAndUpdate(
      req.params.id,
      { nome, cargaHoraria },
      { new: true }
    );
    if (!disciplina) return res.status(404).json({ message: 'Disciplina não encontrada.' });
    res.json(disciplina);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
}

export async function deleteDisciplina(req, res) {
  try {
    const disciplina = await Disciplina.findByIdAndDelete(req.params.id);
    if (!disciplina) return res.status(404).json({ message: 'Disciplina não encontrada.' });
    res.json({ message: 'Disciplina removida com sucesso.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
}