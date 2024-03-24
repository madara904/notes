import * as z from "zod"

export const  NotesValidationSchema = z.object({
    title: z.string().min(6, {message: "too short"}).max(25),
    text: z.string().min(6, {message: "too short"}).max(50),
  })
 