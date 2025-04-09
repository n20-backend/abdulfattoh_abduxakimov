import { Router } from 'express';

import { userController } from '../controllers/user.controller.js';
import { dataValidator } from '../middleware/dataVMID.js';
import { userSchema, userUpdateSchema } from '../validators/index.js';

const router = Router();

router.post('/', dataValidator(userSchema), userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', dataValidator(userUpdateSchema), userController.updateUser);
router.delete('/:id', userController.deleteUser);

export {router as userRoutes};