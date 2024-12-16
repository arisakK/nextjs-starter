import { z, ZodSchema } from 'zod'

export const ProfileSchema = z.object({
    firstName: z.string().min(2, { message: 'ชื่อ อักษระต้องมากกว่า 2 อักขระ' }),
    lastName: z.string().min(2, { message: 'นามสกุล อักษระต้องมากกว่า 2 อักขระ' }),
    userName: z.string().min(2, { message: 'บัญชีผู้ใช้งาน อักษระต้องมากกว่า 2 อักขระ' }),
})

const validateImage = (size = 1) => {
    const maxFileSize = (1024 * 1024) * size
    return z.instanceof(File).refine((file) => file.size <= maxFileSize, `File size must be less than ${size}MB`)
}

export const ImageSchema = z.object({
    image: validateImage()
})

export const LandmarkSchema = z.object({
    name: z.string().min(5, { message: 'ชื่อต้องมากกว่า 5 อักขระ' }).max(100, { message: 'ชื่อต้องน้อยกว่า 100 อักขระ' }),
    category: z.string(),
    description: z.string().min(5, { message: 'ชื่อต้องมากกว่า 5 อักขระ' }).max(200, { message: 'ชื่อต้องน้อยกว่า 200 อักขระ' }),
    price: z.coerce.number().int().min(0, { message: 'ราคาต้องมากกว่า 0' }),
    province: z.string(),
    lat: z.coerce.number(),
    lng: z.coerce.number(),
})

export const validateWithZod = <T>(schema: ZodSchema<T>, data: unknown): T => {
    const result = schema.safeParse(data)

    if (!result.success) {
        const errors = result.error?.errors.map((error) => error.message)
        throw new Error(errors.join(','))
    }

    return result.data
}
