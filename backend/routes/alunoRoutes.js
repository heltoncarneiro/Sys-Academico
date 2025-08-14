import { Router } from 'express';
import {
  listAlunos,
  getAluno,
  getAlunoByMatricula,
  createAluno,
  updateAluno,
  deleteAluno,
  listDisciplinasDoAluno,
  addDisciplinaParaAluno,
  removeDisciplinaDoAluno,
} from '../controllers/alunoController.js';

const router = Router();

router.get('/', listAlunos);
router.post('/', createAluno);
router.get('/matricula/:matricula', getAlunoByMatricula);
router.get('/:id', getAluno);
router.put('/:id', updateAluno);
router.delete('/:id', deleteAluno);

router.get('/:id/disciplinas', listDisciplinasDoAluno);
router.post('/:id/disciplinas', addDisciplinaParaAluno);
router.delete('/:id/disciplinas/:disciplinaId', removeDisciplinaDoAluno);

export default router;