import { v4 } from 'uuid';
import {pool} from '../config/pg.js';

export const AuthorController = {
    createAuthor: async (req, res, next) => {
        try {
            const { body } = req;
            const query = `INSERT INTO author (id, name, bio, birthdate)
                           VALUES ($1, $2, $3, $4) RETURNING id`;
            const values = [v4(), body.name, body.bio, body.birthdate];
            const result = await pool.query(query, values);
            const author = result.rows[0];
            if (result.rowCount === 0) {
                return res.status(400).json({ message: 'Author creation failed' });
            }
            res.status(201).json({ authorId: author.id, message: 'Author created' });
        }
        catch (error) {
            next(error);
        }
    },
    getAllAuthors: async (req, res, next) => {
        try {
            const query = `SELECT * FROM author`;
            const result = await pool.query(query);
            const authors = result.rows;
            res.status(200).json({ authors });
        }
        catch (error) {
            next(error);
        }
    },
    getAuthorById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const query = `SELECT * FROM author WHERE id = $1`;
            const values = [id];
            const result = await pool.query(query, values);
            const author = result.rows[0];
            if (!author) {
                return res.status(404).json({ message: 'Author not found' });
            }
            res.status(200).json({ author });
        }
        catch (error) {
            next(error);
        }
    },
    updateAuthor: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { body } = req;

            const oldAuthorQuery = `SELECT * FROM author WHERE id = $1`;
            const oldAuthorResult = await pool.query(oldAuthorQuery, [id]);
            const oldAuthor = oldAuthorResult.rows[0];

            if (!oldAuthor) {
                return res.status(404).json({ message: 'Author not found' });
            }

            const updatedAuthor = {
                name: body.name || oldAuthor.name,
                bio: body.bio || oldAuthor.bio,
                birthdate: body.birthdate || oldAuthor.birthdate,
                updatedAt: new Date().toISOString()
            };

            const query = `UPDATE author SET name = $1, bio = $2, birthdate = $3, updatedAt = $4 WHERE id = $5 RETURNING id`;
            const values = [updatedAuthor.name, updatedAuthor.bio, updatedAuthor.birthdate, updatedAuthor.updatedAt, id];
            const result = await pool.query(query, values);
            const author = result.rows[0];

            res.status(200).json({ authorId: author.id, message: 'Author updated' });
        }
        catch (error) {
            next(error);
        }
    },
    deleteAuthor: async (req, res, next) => {
        try {
            const { id } = req.params;
            const query = `DELETE FROM author WHERE id = $1`;
            const values = [id];
            const result = await pool.query(query, values);
            if (result.rowCount === 0) {
                return res.status(404).json({ message: 'Author not found' });
            }
            res.status(200).json({ message: 'Author deleted' });
        }
        catch (error) {
            next(error);
        }
    }
};