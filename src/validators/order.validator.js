import { z } from 'zod';

export const orderSchema = z.object({
    userId: z.string().uuid(),
    items: z.array(
        z.object({
            bookId: z.string().uuid(),
            quantity: z.number().positive(),
        })
    ),
    totalPrice: z.number().positive(),
    status: z.enum(['pending', 'completed', 'canceled'])
});

export const orderUpdateSchema = orderSchema.partial();