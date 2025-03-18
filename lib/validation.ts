import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(20, "El nombre puede tener como maximo 20 caracteres."),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number")
});


export const ProfileFormValidation = z.object({
  name: z
    .string()
    .min(2, "Nombre debe tener al menos 2 caracteres")
    .max(50, "Nombre debe tener como maximo 50 caracteres"),
  email: z.string().email("email invalido"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Numero de telefono invalido"),
  gender: z.enum(["masculino", "femenino", "otro"]),
  location: z.string().min(1, "Por favor selecciona un distrito"),
  profilePic: z.custom<File[]>().optional(),
  isCaretaker: z.boolean().default(false)
});

export const CreatePetSchema = z.object({
  petName: z
    .string()
    .min(2, "Nombre debe tener al menos 2 caracteres.")
    .max(20, "Nombre debe tener como maximo 20 caracteres."),
  species: z.enum(["perro", "gato", "otro"]),
  breed: z.string().optional(),
  age: z.number().optional(),
  petSize: z.enum(["pequeno", "mediano", "grande"]),
  petGender: z.enum(["macho", "hembra"]),
  description: z
    .string()
    .min(2, "Descripcion debe tener al menos 10 caracteres.")
    .max(500, "Descripcion debe tener como maximo 500 caracteres."),
  photos: z.array(z.custom<File[]>()).optional(),
  location: z.string().min(1, "Por favor selecciona un distrito"),
  status: z.enum(["disponible", "adoptado"]),
  birthDate: z.coerce.date(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
});

