import { Router } from 'express';

import { AuthorController } from '../controllers/author.controller.js';
import { dataValidator } from '../middleware/dataVMID.js';
import { authorSchema, authorUpdateSchema } from '../validators/index.js';

const router = Router();

router.post('/', dataValidator(authorSchema), AuthorController.createAuthor);
router.get('/', AuthorController.getAllAuthors);
router.get('/:id', AuthorController.getAuthorById);
router.put('/:id', dataValidator(authorUpdateSchema), AuthorController.updateAuthor);
router.delete('/:id', AuthorController.deleteAuthor);

export { router as authorRoutes };