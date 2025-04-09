import { z } from 'zod';

export const authorSchema = z.object({
    name: z.string().min(3),
    bio: z.string().optional(),
    birthdate: z.string().optional()
});

export const authorUpdateSchema = authorSchema.partial();