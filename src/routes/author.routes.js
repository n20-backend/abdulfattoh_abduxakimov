import { Router } from 'express';

import { AuthorController } from '../controllers/author.controller.js';
import { dataValidator } from '../middleware/dataVMID.js';
import { authorSchema, authorUpdateSchema } from '../validators/index.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = Router();

router.post('/', verifyToken, dataValidator(authorSchema), AuthorController.createAuthor);
router.get('/', verifyToken, AuthorController.getAllAuthors);
router.get('/:id', verifyToken, AuthorController.getAuthorById);
router.put('/:id', verifyToken, dataValidator(authorUpdateSchema), AuthorController.updateAuthor);
router.delete('/:id', verifyToken, AuthorController.deleteAuthor);

export { router as authorRoutes };