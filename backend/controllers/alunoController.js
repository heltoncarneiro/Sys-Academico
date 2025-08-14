import Aluno from '../models/Aluno.js';
import Disciplina from '../models/Disciplina.js';
import AlunoDisciplina from '../models/AlunoDisciplina.js';

export async function listAlunos(req, res) {
  try {
    const alunos = await Aluno.find().sort({ createdAt: -1 });
    res.json(alunos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
}

export async function getAluno(req, res) {
  try {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado.' });
    res.json(aluno);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
}

export async function getAlunoByMatricula(req, res) {
  try {
    const aluno = await Aluno.findOne({ matricula: req.params.matricula });
    if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado.' });
    res.json(aluno);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
}

export async function createAluno(req, res) {
  try {
    const { nome, endereco, dataNascimento, cpf, matricula, telefone, email, curso } = req.body;
    if (!nome) return res.status(400).json({ message: 'nome é obrigatório.' });

    const aluno = await Aluno.create({
      nome,
      endereco,
      dataNascimento, // pass through string
      cpf,
      matricula,
      telefone,
      email,
      curso,
    });
    res.status(201).json(aluno);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
}

export async function updateAluno(req, res) {
  try {
    const { nome, endereco, dataNascimento, cpf, matricula, telefone, email, curso } = req.body;
    if (nome === '') return res.status(400).json({ message: 'nome não pode ser vazio.' });

    const update = { nome, endereco, cpf, matricula, telefone, email, curso };

    if (dataNascimento !== undefined) {
      update.dataNascimento = dataNascimento; // pass through string or null
    }

    const aluno = await Aluno.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado.' });
    res.json(aluno);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
}

export async function deleteAluno(req, res) {
  try {
    const aluno = await Aluno.findByIdAndDelete(req.params.id);
    if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado.' });
    await AlunoDisciplina.deleteMany({ idAluno: req.params.id });
    res.json({ message: 'Aluno removido com sucesso.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
}

export async function listDisciplinasDoAluno(req, res) {
  try {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado.' });

    const links = await AlunoDisciplina.find({ idAluno: req.params.id }).populate('idDisciplina');
    const disciplinas = links.map((l) => l.idDisciplina);
    res.json(disciplinas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
}

export async function addDisciplinaParaAluno(req, res) {
  try {
    const { disciplinaId } = req.body;
    if (!disciplinaId) return res.status(400).json({ message: 'disciplinaId é obrigatório.' });

    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado.' });

    const disc = await Disciplina.findById(disciplinaId);
    if (!disc) return res.status(404).json({ message: 'Disciplina não encontrada.' });

    const link = await AlunoDisciplina.create({ idAluno: aluno._id, idDisciplina: disc._id });
    res.status(201).json(link);
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(409).json({ message: 'Disciplina já alocada para o aluno.' });
    }
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
}

export async function removeDisciplinaDoAluno(req, res) {
  try {
    const { id, disciplinaId } = req.params;
    const result = await AlunoDisciplina.findOneAndDelete({ idAluno: id, idDisciplina: disciplinaId });
    if (!result) return res.status(404).json({ message: 'Associação não encontrada.' });
    res.json({ message: 'Disciplina removida do aluno.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
}