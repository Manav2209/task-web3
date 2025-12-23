import { z } from "zod";
import { eventStatus } from "@/db/schema";



export const createEventSchema = z.object({
    title: z
    .string()
    .min(3, "Title must be at least 3 characters")
        .max(255, "Title must be at most 255 characters"),
    description: z
        .string()
        .max(2000, "Description must be at most 2000 characters")
        .optional(),
    location: z
        .string()
        .min(2, "Location must be at least 2 characters")
        .max(255, "Location must be at most 255 characters"),
    coverImageUrl: z
        .string()
        .url("Invalid image URL")
        .max(512, "Image URL too long")
        .optional()
        .or(z.literal("")),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    metadata: z.unknown().optional(),
    })

export const updateEventSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(255, "Title must be at most 255 characters")
        .optional(),
        description: z
        .string()
        .max(2000, "Description must be at most 2000 characters")
        .optional(),
        location: z
        .string()
        .min(2, "Location must be at least 2 characters")
        .max(255, "Location must be at most 255 characters")
        .optional(),
        coverImageUrl: z
        .string()
        .url("Invalid image URL")
        .max(512, "Image URL too long")
        .optional()
        .or(z.literal("")),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    status: z.enum(eventStatus).optional(),
    metadata: z.unknown().optional(),
})


export const paginationSchema = z.object({
    page: z.coerce.number().int().positive().default(1).optional(),
    limit: z.coerce.number().int().positive().max(100).default(10).optional(),
});