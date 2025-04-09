import { v4 } from 'uuid';
import {pool} from '../config/pg.js';

export const orderController = {
    createOrder: async (req, res, next) => {
        try {
            const { body } = req;
            const query = `INSERT INTO orders (id, userId, items, totalPrice, status)
                           VALUES ($1, $2, $3, $4, $5) RETURNING id`;
            const values = [v4(), body.userId, body.items, body.totalPrice, body.status];
            const result = await pool.query(query, values);
            const order = result.rows[0];
            if (!order) {
                return res.status(400).json({ message: 'Order creation failed' });
            }
            res.status(201).json({ orderId: order.id, message: 'Order created' });
        }
        catch (error) {
            next(error);
        }
    },
    getAllOrders: async (req, res, next) => {
        try {
            const query = `SELECT * FROM orders`;
            const result = await pool.query(query);
            const orders = result.rows;
            res.status(200).json({ orders });
        }
        catch (error) {
            next(error);
        }
    },
    getOrderById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const query = `SELECT * FROM orders WHERE id = $1`;
            const values = [id];
            const result = await pool.query(query, values);
            const order = result.rows[0];
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(200).json({ order });
        }
        catch (error) {
            next(error);
        }
    },
    updateOrder: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { body } = req;

            const oldOrderQuery = `SELECT * FROM orders WHERE id = $1`;
            const oldOrderResult = await pool.query(oldOrderQuery, [id]);
            const oldOrder = oldOrderResult.rows[0];

            if (!oldOrder) {
                return res.status(404).json({ message: 'Order not found' });
            }

            const updatedOrder = {
                userId: body.userId || oldOrder.userId,
                items: body.items || oldOrder.items,
                totalPrice: body.totalPrice || oldOrder.totalPrice,
                status: body.status || oldOrder.status,
                updatedAt: new Date().toISOString()
            };

            const query = `UPDATE orders SET userId = $1, items = $2, totalPrice = $3, status = $4, updatedAt = $5 WHERE id = $6 RETURNING id`;
            const values = [updatedOrder.userId, updatedOrder.items, updatedOrder.totalPrice, updatedOrder.status, updatedOrder.updatedAt, id];
            const result = await pool.query(query, values);
            const order = result.rows[0];

            res.status(200).json({ orderId: order.id, message: 'Order updated' });
        }
        catch (error) {
            next(error);
        }
    },
    deleteOrder: async (req, res, next) => {
        try {
            const { id } = req.params;
            const query = `DELETE FROM orders WHERE id = $1`;
            const values = [id];
            const result = await pool.query(query, values);
            if (result.rowCount === 0) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(200).json({message: 'Order deleted' });
        }
        catch (error) {
            next(error);
        }
    }
};