import { Router } from 'express';
import { listDisciplinas, createDisciplina, updateDisciplina, deleteDisciplina } from '../controllers/disciplinaController.js';

const router = Router();

router.get('/', listDisciplinas);
router.post('/', createDisciplina);
router.put('/:id', updateDisciplina);
router.delete('/:id', deleteDisciplina);

export default router;