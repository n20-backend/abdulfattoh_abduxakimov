import { z } from 'zod';

export const userSchema = z.object({
    email: z.string().email(),
    username: z.string().min(3),
    password: z.string().min(6),
    role: z.enum(['user', 'admin', 'superadmin']),
    status: z.enum(['active', 'inactive'])
});

export const userUpdateSchema = userSchema.partial();