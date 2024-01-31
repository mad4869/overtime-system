import { z } from "zod";

import setRecapPeriod from "@/constants/recapPeriod";
import { $Enums } from "@prisma/client";

const timeFormatRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
const recapPeriod = setRecapPeriod()

export const userAddItemSchema = z.object({
    pekerjaan: z.string().trim().min(1, 'Pekerjaan tidak boleh kosong.'),
    tanggal: z.string().length(10, 'Tanggal tidak boleh kosong.').refine((date) => {
        const tanggal = new Date(date)
        return (
            tanggal.getTime() >= recapPeriod.startPeriod.getTime() &&
            tanggal.getTime() <= recapPeriod.finishedPeriod.getTime()
        )
    }, 'Tanggal pekerjaan harus berada di dalam periode yang telah ditentukan.'),
    mulai: z.string().min(1, 'Waktu mulai tidak boleh kosong.').regex(timeFormatRegex, 'Format waktu salah.'),
    selesai: z.string().min(1, 'Waktu selesai tidak boleh kosong.').regex(timeFormatRegex, 'Format waktu salah.')
})

export const adminAddItemSchema = userAddItemSchema.omit({ tanggal: true }).extend({
    tanggal: z.string().length(10, 'Tanggal tidak boleh kosong.'),
    'user ID': z.string().trim().min(1, 'User ID tidak boleh kosong.').regex(/^\d+$/, 'User ID harus berupa angka.'),
    'user item recap ID': z.string().trim().refine(data => data === '' || /^\d+$/.test(data), 'Rekap ID harus berupa angka.')
})

export const userLoginSchema = z.object({
    npk: z.string().trim().min(1, 'NPK tidak boleh kosong.').max(255, 'NPK tidak boleh melebihi 255 karakter.'),
    password: z.string().min(6, 'Password minimal berisi 6 karakter.')
})

export const userDeleteAccountSchema = userLoginSchema.omit({ npk: true })
export const userResetPasswordSchema = userLoginSchema.omit({ password: true })

export const userRegisterSchema = z.object({
    nama: z.string().trim().min(1, 'Nama tidak boleh kosong.').max(255, 'Nama tidak boleh melebihi 255 karakter.'),
    npk: z.string().trim().min(1, 'NPK tidak boleh kosong.').max(255, 'NPK tidak boleh melebihi 255 karakter.'),
    email: z.string().email('Format email invalid.').max(255, 'Email tidak boleh melebihi 255 karakter.'),
    password: z.string().min(6, 'Password minimal berisi 6 karakter.').refine((password) => {
        const hasNumber = /[0-9]/.test(password)
        const hasLetter = /[a-zA-Z]/.test(password)
        return hasNumber && hasLetter
    }, 'Password harus memiliki huruf dan angka sekaligus.'),
    jabatan: z.string().trim().min(1, 'Jabatan tidak boleh kosong.').max(255, 'Jabatan tidak boleh melebihi 255 karakter.'),
    unit: z.string().trim().min(1, 'Unit kerja tidak boleh kosong.').max(255, 'Unit kerja tidak boleh melebihi 255 karakter.'),
    departemen: z.string().trim().min(1, 'Departemen tidak boleh kosong.').max(255, 'Departemen tidak boleh melebihi 255 karakter.'),
    perusahaan: z.string().trim().min(1, 'Perusahaan tidak boleh kosong.').max(255, 'Perusahaan tidak boleh melebihi 255 karakter.')
})

export const userChangePasswordSchema = z.object({
    'password lama': z.string().min(6, 'Password minimal berisi 6 karakter.'),
    'password baru': z.string().min(6, 'Password minimal berisi 6 karakter.').refine((password) => {
        const hasNumber = /[0-9]/.test(password)
        const hasLetter = /[a-zA-Z]/.test(password)
        return hasNumber && hasLetter
    }, 'Password harus memiliki huruf dan angka sekaligus.')
})

export const userUpdateSchema = userRegisterSchema.extend({
    role: z.nativeEnum($Enums.UserRole, {
        required_error: 'Role tidak boleh kosong.',
        invalid_type_error: 'Role harus berisi USER, ADMIN, atau SUPER_ADMIN'
    }),
    aktif: z.coerce.boolean()
}).omit({ password: true })

export const adminUpdateRecapSchema = z.object({
    'disetujui AVP': z.coerce.boolean(),
    'disetujui VP': z.coerce.boolean()
})