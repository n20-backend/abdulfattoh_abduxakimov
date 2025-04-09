import { z } from 'zod';

export const genreSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
});

export const genreUpdateSchema = genreSchema.partial();