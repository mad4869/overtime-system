import { z } from "zod";

const timeFormatRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/

export const userAddItemSchema = z.object({
    item: z.string().min(1, 'Item is required.').trim(),
    tanggal: z.coerce.date(),
    mulai: z.string().min(1, 'Start time is required.').regex(timeFormatRegex, 'Invalid time format'),
    selesai: z.string().min(1, 'Finished time is required.').regex(timeFormatRegex, 'Invalid time format')
})

export const userLoginSchema = z.object({
    npk: z.string().min(1, 'NPK is required.').max(255).trim(),
    password: z.string().min(6, 'Password requires min. 6 characters.')
})

export const userRegisterSchema = z.object({
    name: z.string().min(1, 'Name is required.').trim(),
    npk: z.string().min(1, 'NPK is required.').trim(),
    password: z.string().min(6, 'Password requires min. 6 characters.').refine((password) => {
        const hasNumber = /[0-9]/.test(password)
        const hasLetter = /[a-zA-Z]/.test(password)
        return hasNumber && hasLetter
    }, 'Password must contain both numbers and letters.'),
    position: z.string().min(1, 'Position is required.').trim(),
    unit: z.string().min(1, 'Unit is required.').trim(),
    department: z.string().min(1, 'Department is required.').trim(),
    company: z.string().min(1, 'Company is required.').trim()
})