import { z } from "zod";

import setRecapPeriod from "@/constants/recapPeriod";

const timeFormatRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
const recapPeriod = setRecapPeriod()

export const userAddItemSchema = z.object({
    pekerjaan: z.string().min(1, 'Pekerjaan tidak boleh kosong.').trim(),
    tanggal: z.string().length(10, 'Tanggal tidak boleh kosong.').refine((date) => {
        const tanggal = new Date(date)
        return (
            tanggal.getTime() >= recapPeriod.startPeriod.getTime() &&
            tanggal.getTime() <= recapPeriod.finishedPeriod.getTime()
        )
    }, 'Tanggal pekerjaan harus berada di dalam periode yang telah ditentukan.'),
    mulai: z.string().min(1, 'Waktu mulai tidak boleh kosong.').regex(timeFormatRegex, 'Format waktu salah.'),
    selesai: z.string().min(1, 'Waktu selesai tidak boleh kosong.').regex(timeFormatRegex, 'Format waktu salah.')
}).refine((schema) => {
    const [mulaiHour, mulaiMinute] = schema.mulai.split(':').map(Number);
    const [selesaiHour, selesaiMinute] = schema.selesai.split(':').map(Number);

    if (mulaiHour !== selesaiHour) return selesaiHour > mulaiHour

    return selesaiMinute > mulaiMinute
}, { message: 'Waktu selesai harus setelah mulai.', path: ['selesai'] })

export const userLoginSchema = z.object({
    npk: z.string().min(1, 'NPK is required.').max(255).trim(),
    password: z.string().min(6, 'Password requires min. 6 characters.')
})

export const userDeleteAccountSchema = userLoginSchema.omit({ npk: true })

export const userRegisterSchema = z.object({
    name: z.string().min(1, 'Name is required.').trim(),
    npk: z.string().min(1, 'NPK is required.').trim(),
    email: z.string().email('Email must be in a valid email format.'),
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

export const userChangePasswordSchema = z.object({
    'password lama': z.string().min(6, 'Password minimal berisi 6 karakter.'),
    'password baru': z.string().min(6, 'Password minimal berisi 6 karakter.').refine((password) => {
        const hasNumber = /[0-9]/.test(password)
        const hasLetter = /[a-zA-Z]/.test(password)
        return hasNumber && hasLetter
    }, 'Password harus memiliki huruf dan angka sekaligus.')
})