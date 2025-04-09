import { Router } from 'express';

import { orderController } from '../controllers/order.controller.js';
import { dataValidator } from '../middleware/dataVMID.js';
import { orderSchema, orderUpdateSchema } from '../validators/index.js';

const router = Router();

router.post('/', dataValidator(orderSchema), orderController.createOrder);
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id', dataValidator(orderUpdateSchema), orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

export {router as orderRoutes};