import { v4 } from 'uuid';
import {pool} from '../config/pg.js';

export const GenreController = {
    createGenre: async (req, res, next) => {
        try {
            const { body } = req;
            const query = `INSERT INTO genre (id, name, description)
                           VALUES ($1, $2, $3) RETURNING id`;
            const values = [v4(), body.name, body.description];
            const result = await pool.query(query, values);
            const genre = result.rows[0];
            if (result.rowCount === 0) {
                return res.status(400).json({ message: 'Genre creation failed' });
            }
            res.status(201).json({ genreId: genre.id, message: 'Genre created' });
        }
        catch (error) {
            next(error);
        }
    },
    getAllGenres: async (req, res, next) => {
        try {
            const query = `SELECT * FROM genre`;
            const result = await pool.query(query);
            const genres = result.rows;
            res.status(200).json({ genres });
        }
        catch (error) {
            next(error);
        }
    },
    getGenreById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const query = `SELECT * FROM genre WHERE id = $1`;
            const values = [id];
            const result = await pool.query(query, values);
            const genre = result.rows[0];
            if (!genre) {
                return res.status(404).json({ message: 'Genre not found' });
            }
            res.status(200).json({ genre });
        }
        catch (error) {
            next(error);
        }
    },
    updateGenre: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { body } = req;

            const oldGenreQuery = `SELECT * FROM genre WHERE id = $1`;
            const oldGenreResult = await pool.query(oldGenreQuery, [id]);
            const oldGenre = oldGenreResult.rows[0];

            if (!oldGenre) {
                return res.status(404).json({ message: 'Genre not found' });
            }

            const updatedGenre = {
                name: body.name || oldGenre.name,
                description: body.description || oldGenre.description,
                updatedAt: new Date().toISOString()
            };

            const query = `UPDATE genre SET name = $1, description = $2, updatedAt = $3 WHERE id = $4 RETURNING id`;
            const values = [updatedGenre.name, updatedGenre.description, updatedGenre.updatedAt, id];
            const result = await pool.query(query, values);
            const genre = result.rows[0];

            res.status(200).json({ genreId: genre.id, message: 'Genre updated' });
        }
        catch (error) {
            next(error);
        }
    },
    deleteGenre: async (req, res, next) => {
        try {
            const { id } = req.params;
            const query = `DELETE FROM genre WHERE id = $1`;
            const values = [id];
            const result = await pool.query(query, values);
            if (result.rowCount === 0) {
                return res.status(404).json({ message: 'Genre not found' });
            }
            res.status(200).json({ message: 'Genre deleted' });
        }
        catch (error) {
            next(error);
        }
    }
};