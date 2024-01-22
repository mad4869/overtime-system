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
    date: z.coerce.date(),
    startTime: z.string(),
    finishedTime: z.string()
});

export const userLoginSchema = z.object({
    npk: z.string().min(1, 'NPK is required.').max(255),
    password: z.string().min(6, 'Password requires min. 6 characters.')
})

export const userRegisterSchema = z.object({
    name: z.string().min(1, 'Name is required.'),
    npk: z.string().min(1, 'NPK is required.'),
    password: z.string().min(6, 'Password requires min. 6 characters.'),
    position: z.string().min(1, 'Position is required.'),
    unit: z.string().min(1, 'Unit is required.'),
    department: z.string().min(1, 'Department is required.'),
    company: z.string().min(1, 'Company is required.')
})