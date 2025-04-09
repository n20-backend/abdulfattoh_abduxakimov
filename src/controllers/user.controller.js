import { v4 } from 'uuid';
import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middleware/verifyToken.js';

import {pool} from '../config/pg.js';

export const userController = {
    signInUser: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const query = `SELECT * FROM users WHERE email = $1`;
            const values = [email];
            const result = await pool.query(query, values);
            const user = result.rows[0];

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isPasswordValid = await compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token });
        }
        catch (error) {
            next(error);
        }
    },
    createUser: async (req, res, next) => {
        try {
            const { body } = req;
            const hashedPassword = await hash(body.password, 10);
            const query = `INSERT INTO users (id, email, username, password, role, status)
                           VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
            const values = [v4(), body.email, body.username, hashedPassword, body.role, body.status];
            const result = await pool.query(query, values);
            const user = result.rows[0];
            if (!user) {
                return res.status(400).json({ message: 'User creation failed' });
            }
            res.status(201).json({ message: 'User created', userId: user.id });
        }
        catch (error) {
            next(error);
        }
    },
    getAllUsers: async (req, res, next) => {
        try {
            const query = `SELECT * FROM users`;
            const result = await pool.query(query);
            const users = result.rows;
            res.status(200).json({ users });
        }
        catch (error) {
            next(error);
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const query = `SELECT * FROM users WHERE id = $1`;
            const values = [id];
            const result = await pool.query(query, values);
            const user = result.rows[0];
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ user });
        }
        catch (error) {
            next(error);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { body } = req;

            const oldUserQuery = `SELECT * FROM users WHERE id = $1`;
            const oldUserResult = await pool.query(oldUserQuery, [id]);
            const oldUser = oldUserResult.rows[0];

            if (!oldUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            const updatedUser = {
                email: body.email || oldUser.email,
                username: body.username || oldUser.username,
                password: body.password || oldUser.password,
                role: body.role || oldUser.role,
                status: body.status || oldUser.status,
                updatedAt: new Date().toISOString()
            };

            const query = `UPDATE users SET email = $1, username = $2, password = $3, role = $4, status = $5, updatedAt = $6 WHERE id = $7 RETURNING id`;
            const values = [updatedUser.email, updatedUser.username, updatedUser.password, updatedUser.role, updatedUser.status, updatedUser.updatedAt, id];
            const result = await pool.query(query, values);
            const user = result.rows[0];

            res.status(200).json({ userId: user.id, message: 'User updated' });
        }
        catch (error) {
            next(error);
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const { id } = req.params;
            const query = `DELETE FROM users WHERE id = $1`;
            const values = [id];
            const result = await pool.query(query, values);
            if (result.rowCount === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({message: 'User deleted' });
        }
        catch (error) {
            next(error);
        }
    }
};