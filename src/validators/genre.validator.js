import { z } from 'zod';

export const genreSchema = z.object({
    name: z.string().min(1, { message: 'Name cannot be empty' }),
    description: z.string().min(1, { message: 'Description cannot be empty' }),
});

export const genreUpdateSchema = genreSchema.partial();