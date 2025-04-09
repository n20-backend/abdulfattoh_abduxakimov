import { z } from 'zod';

export const bookSchema = z.object({
    title: z.string().min(1),
    authorId: z.string().uuid(),
    genreId: z.string().uuid(),
    price: z.number().positive(),
    stock: z.number().int().nonnegative(),
    publishedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    status: z.enum(['available', 'out of stock', 'discontinued']),
    imageUrls: z.array(z.string().url()).optional(),
    description: z.string().optional(),
});

export const bookUpdateSchema = bookSchema.partial();