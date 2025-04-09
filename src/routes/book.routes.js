import { Router } from 'express';

import { bookController } from '../controllers/book.controller.js';
import { dataValidator } from '../middleware/dataVMID.js';
import { bookSchema, bookUpdateSchema } from '../validators/index.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = Router();

router.post('/', verifyToken, dataValidator(bookSchema), bookController.createBook);
router.get('/', verifyToken, bookController.getAllBooks);
router.get('/:id', verifyToken, bookController.getBookById);
router.put('/:id', verifyToken, dataValidator(bookUpdateSchema), bookController.updateBook);
router.delete('/:id', verifyToken, bookController.deleteBook);

export {router as bookRoutes};