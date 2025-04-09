import { v4 } from 'uuid';
import {pool} from '../config/pg.js';

export const bookController = {
    createBook: async (req, res, next) => {
        try {
            const { body } = req;
            const query = `INSERT INTO book (id, title, author_id, genre_id, price, stock, publishedDate, status, image_urls, description)
                           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`;
            const values = [v4(), body.title, body.authorId, body.genreId, body.price, body.stock, body.publishedDate, body.status, body.imageUrls, body.description];
            const result = await pool.query(query, values);
            const book = result.rows[0];
            if (result.rowCount === 0) {
                return res.status(400).json({ message: 'Book creation failed' });
            }
            res.status(201).json({ bookId: book.id, message: 'Book created' });
        }
        catch (error) {
            next(error);
        }
    },
    getAllBooks: async (req, res, next) => {
        try {
            const query = `SELECT * FROM book`;
            const result = await pool.query(query);
            const books = result.rows;
            res.status(200).json({ books });
        }
        catch (error) {
            next(error);
        }
    },
    getBookById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const query = `SELECT * FROM book WHERE id = $1`;
            const values = [id];
            const result = await pool.query(query, values);
            const book = result.rows[0];
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.status(200).json({ book });
        }
        catch (error) {
            next(error);
        }
    },
    updateBook: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { body } = req;

            const oldBookQuery = `SELECT * FROM book WHERE id = $1`;
            const oldBookResult = await pool.query(oldBookQuery, [id]);
            const oldBook = oldBookResult.rows[0];

            if (!oldBook) {
                return res.status(404).json({ message: 'Book not found' });
            }

            const updatedBook = {
                title: body.title || oldBook.title,
                authorId: body.authorId || oldBook.author_id,
                genreId: body.genreId || oldBook.genre_id,
                price: body.price || oldBook.price,
                stock: body.stock || oldBook.stock,
                publishedDate: body.publishedDate || oldBook.publishedDate,
                status: body.status || oldBook.status,
                imageUrls: body.imageUrls || oldBook.image_urls,
                description: body.description || oldBook.description,
                updatedAt: new Date().toISOString()
            };

            const query = `UPDATE book SET title = $1, author_id = $2, genre_id = $3, price = $4, stock = $5, publishedDate = $6, status = $7, image_urls = $8, description = $9, updatedAt = $10 WHERE id = $11 RETURNING id`;
            const values = [updatedBook.title, updatedBook.authorId, updatedBook.genreId, updatedBook.price, updatedBook.stock, updatedBook.publishedDate, updatedBook.status, updatedBook.imageUrls, updatedBook.description, updatedBook.updatedAt, id];
            const result = await pool.query(query, values);
            const book = result.rows[0];

            res.status(200).json({ bookId: book.id, message: 'Book updated' });
        }
        catch (error) {
            next(error);
        }
    },
    deleteBook: async (req, res, next) => {
        try {
            const { id } = req.params;
            const query = `DELETE FROM book WHERE id = $1`;
            const values = [id];
            const result = await pool.query(query, values);
            if (result.rowCount === 0) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.status(200).json({message: 'Book deleted' });
        }
        catch (error) {
            next(error);
        }
    }
};