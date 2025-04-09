import { Router } from 'express';

import { bookController } from '../controllers/book.controller.js';
import { dataValidator } from '../middleware/dataVMID.js';
import { bookSchema, bookUpdateSchema } from '../validators/index.js';

const router = Router();

router.post('/', dataValidator(bookSchema), bookController.createBook);
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.put('/:id', dataValidator(bookUpdateSchema), bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

export {router as bookRoutes};