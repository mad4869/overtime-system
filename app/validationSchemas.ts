import { z } from "zod";

export const itemSchema = z.object({
    title: z.string().min(1, 'Title is required.'),
    duration: z.string().min(1, 'Duration is required')
});

export const loginUserSchema = z.object({
    npk: z.string().min(1, 'NPK is required.').max(255),
    password: z.string().min(6, 'Password needs 6 characters minimal.')
})