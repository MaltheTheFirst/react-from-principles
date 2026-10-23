import { z } from 'zod'

export const catchFormSchema = z.object({
    fish: z
        .string()
        .trim()
        .min(1, 'Enter a fish name'),

    length: z
        .string()
        .refine(
            (value) => Number(value) > 0,
            'Enter a length greater than 0'
        ),
})