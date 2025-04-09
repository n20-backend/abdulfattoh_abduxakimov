import { Router } from 'express';

import { GenreController } from '../controllers/genre.controller.js';
import { dataValidator } from '../middleware/dataVMID.js';
import { genreSchema, genreUpdateSchema } from '../validators/index.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = Router();

router.post('/', verifyToken, dataValidator(genreSchema), GenreController.createGenre);
router.get('/', verifyToken, GenreController.getAllGenres);
router.get('/:id', verifyToken, GenreController.getGenreById);
router.put('/:id', verifyToken, dataValidator(genreUpdateSchema), GenreController.updateGenre);
router.delete('/:id', verifyToken, GenreController.deleteGenre);

export {router as genreRoutes};