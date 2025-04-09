import { Router } from 'express';

import { GenreController } from '../controllers/genre.controller.js';
import { dataValidator } from '../middleware/dataVMID.js';
import { genreSchema, genreUpdateSchema } from '../validators/index.js';

const router = Router();

router.post('/', dataValidator(genreSchema), GenreController.createGenre);
router.get('/', GenreController.getAllGenres);
router.get('/:id', GenreController.getGenreById);
router.put('/:id', dataValidator(genreUpdateSchema), GenreController.updateGenre);
router.delete('/:id', GenreController.deleteGenre);

export {router as genreRoutes};