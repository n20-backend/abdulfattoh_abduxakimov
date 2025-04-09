import { z } from 'zod';

export const authorSchema = z.object({
    name: z.string().min(1),
    bio: z.string().optional(),
    birthdate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

export const authorUpdateSchema = authorSchema.partial();