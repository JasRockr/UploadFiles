import { z } from 'zod';

export const asesorSchema = z.object({
  body: z
    .object({
      id_asesor: z
        .string()
        .nonempty()
        .min(1)
        .max(255)
        .describe(
          'ID del asesor, debe ser una cadena no vacía de hasta 255 caracteres.',
        ),
      nombre_asesor: z
        .string()
        .nonempty()
        .min(1)
        .max(255)
        .describe(
          'Nombre del asesor, debe ser una cadena no vacía de hasta 255 caracteres.',
        ),
      equipo_entidad: z
        .string()
        .nonempty()
        .min(1)
        .max(255)
        .describe(
          'Equipo o entidad del asesor, debe ser una cadena no vacía de hasta 255 caracteres.',
        ),
      compania: z
        .string()
        .nonempty()
        .min(1)
        .max(255)
        .describe(
          'Compañía del asesor, debe ser una cadena no vacía de hasta 255 caracteres.',
        ),
      correo_contacto: z
        .string()
        .email()
        .optional()
        .default(null)
        .describe('Correo de contacto del asesor (opcional).'),
      celular_contacto: z
        .number()
        .nonnegative()
        .max(10)
        .optional()
        .default(null)
        .describe('Número de celular de contacto del asesor (opcional).'),
      rol_asesor: z
        .string()
        .optional()
        .default(null)
        .describe('Rol del asesor (opcional).'),
      observaciones: z
        .string()
        .optional()
        .describe('Observaciones (opcional).'),
      fecha_novedad: z
        .date()
        .max(new Date(), { message: 'No debe ser posterior a hoy!' })
        .default(new Date())
        .describe(
          'Fecha de novedad del asesor, debe ser una fecha válida no posterior a la fecha actual.',
        ),
      usuario: z
        .string()
        .nonempty()
        .min(3)
        .describe(
          'Usuario, debe ser una cadena no vacía de al menos 3 caracteres.',
        ),
    })
    .describe(
      'Objeto de datos de asesor que se espera en el cuerpo de la solicitud.',
    ),
});
