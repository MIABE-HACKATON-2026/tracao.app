import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
});

export const registerSchema = z.object({
  email: z.string().email('Email invalide'),
  phone: z.string().min(8, 'Numéro de téléphone invalide'),
  first_name: z.string().min(1, 'Prénom requis'),
  last_name: z.string().min(1, 'Nom requis'),
  role: z.enum(['farmer', 'buyer', 'store'], {
    errorMap: () => ({ message: 'Rôle invalide' }),
  }),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
});

export const otpVerifySchema = z.object({
  email: z.string().email('Email invalide'),
  code: z.string().length(6, 'Le code doit contenir 6 chiffres'),
});

export const passwordResetRequestSchema = z.object({
  email: z.string().email('Email invalide'),
});

export const passwordResetConfirmSchema = z.object({
  email: z.string().email('Email invalide'),
  token: z.string().min(1, 'Token requis'),
  new_password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
});

export const farmerProfileSchema = z.object({
  first_name: z.string().min(1, 'Prénom requis'),
  last_name: z.string().min(1, 'Nom requis'),
  phone: z.string().min(8, 'Numéro de téléphone invalide'),
  country: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
});

export const buyerProfileSchema = z.object({
  first_name: z.string().min(1, 'Prénom requis'),
  last_name: z.string().min(1, 'Nom requis'),
  phone: z.string().min(8, 'Numéro de téléphone invalide'),
  country: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
});

export const parcelSchema = z.object({
  name: z.string().min(1, 'Nom de la parcelle requis'),
  gps_coordinates: z.array(
    z.object({
      lat: z.number(),
      lng: z.number(),
    })
  ).min(3, 'Au moins 3 points GPS requis'),
});

export const batchSchema = z.object({
  parcel: z.string().uuid('Parcelle invalide'),
  season: z.string().min(1, 'Saison requise'),
  crop_type: z.enum(['cacao', 'café'], {
    errorMap: () => ({ message: 'Type de culture invalide' }),
  }),
  estimated_quantity: z.number().positive('Quantité doit être positive'),
});

export const harvestSchema = z.object({
  batch: z.string().uuid('Lot invalide'),
  quantity: z.number().positive('Quantité doit être positive'),
  harvest_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Date invalide',
  }),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type OtpVerifyInput = z.infer<typeof otpVerifySchema>;
export type PasswordResetRequestInput = z.infer<typeof passwordResetRequestSchema>;
export type PasswordResetConfirmInput = z.infer<typeof passwordResetConfirmSchema>;
export type FarmerProfileInput = z.infer<typeof farmerProfileSchema>;
export type BuyerProfileInput = z.infer<typeof buyerProfileSchema>;
export type ParcelInput = z.infer<typeof parcelSchema>;
export type BatchInput = z.infer<typeof batchSchema>;
export type HarvestInput = z.infer<typeof harvestSchema>;