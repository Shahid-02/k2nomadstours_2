import { z } from "zod";

export const bookingSchema = z.object({
  tourSlug: z.string().min(1),
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number"),
  preferredDateStart: z.string().min(1, "Choose a preferred start date"),
  preferredDateEnd: z.string().optional(),
  groupSize: z.number().int().min(1, "At least 1 traveler").max(20, "For groups over 20, contact us directly"),
  message: z.string().max(1000).optional(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
