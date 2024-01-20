import { z } from "zod";

export const adminAddItemSchema = z.object({
    title: z.string().min(1, 'Title is required')
})

export const adminUpdateItemSchema = z.object({
    id: z.coerce.number(),
    title: z.string().min(1, 'Title is required')
})

export const adminDeleteItemSchema = z.object({
    id: z.coerce.number()
})

export const userAddItemSchema = z.object({
    itemId: z.coerce.number(),
    startTime: z.coerce.date(),
    finishedTime: z.coerce.date()
});

export const userLoginSchema = z.object({
    npk: z.string().min(1, 'NPK is required.').max(255),
    password: z.string().min(6, 'Password needs 6 characters minimal.')
})