import { Router } from 'express';

import { orderController } from '../controllers/order.controller.js';
import { dataValidator } from '../middleware/dataVMID.js';
import { orderSchema, orderUpdateSchema } from '../validators/index.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = Router();

router.post('/', verifyToken, dataValidator(orderSchema), orderController.createOrder);
router.get('/', verifyToken, orderController.getAllOrders);
router.get('/:id', verifyToken, orderController.getOrderById);
router.put('/:id', verifyToken, dataValidator(orderUpdateSchema), orderController.updateOrder);
router.delete('/:id', verifyToken, orderController.deleteOrder);

export {router as orderRoutes};