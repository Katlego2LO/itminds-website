import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
});

export const newPasswordSchema = z
  .object({
    password: z.string().min(8, "Use at least 8 characters.").max(72, "Use 72 characters or fewer."),
    confirm: z.string(),
  })
  .refine((v) => v.password === v.confirm, {
    path: ["confirm"],
    message: "The two passwords do not match.",
  });