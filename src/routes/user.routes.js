import { Router } from 'express';

import { userController } from '../controllers/user.controller.js';
import { dataValidator } from '../middleware/dataVMID.js';
import { userSchema, userUpdateSchema } from '../validators/index.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = Router();

router.post('/signin', userController.signInUser);

router.post('/', dataValidator(userSchema), userController.createUser);

router.get('/', verifyToken, userController.getAllUsers);
router.get('/:id', verifyToken, userController.getUserById);
router.put('/:id', verifyToken, dataValidator(userUpdateSchema), userController.updateUser);
router.delete('/:id', verifyToken, userController.deleteUser);

export {router as userRoutes};