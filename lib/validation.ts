import { z } from "zod";

export const credentialsSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
  password: z.string().min(8, "Use at least 8 characters.").max(72, "Use 72 characters or fewer."),
});

export const signUpSchema = credentialsSchema.extend({
  fullName: z.string().trim().min(2, "Enter your full name.").max(120),
});

export const enquirySchema = z.object({
  type: z.enum(["general", "admissions", "corporate", "business_school"]),
  name: z.string().trim().min(2, "Enter your name.").max(120),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().max(30).optional(),
  organisation: z.string().trim().max(160).optional(),
  message: z.string().trim().min(10, "Tell us a little more.").max(2000),
  consent: z.literal("on", {
    errorMap: () => ({ message: "Please confirm consent to continue." }),
  }),
});

export function safeNext(value: FormDataEntryValue | string | null | undefined) {
  const next = typeof value === "string" ? value : "";
  return next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
}
