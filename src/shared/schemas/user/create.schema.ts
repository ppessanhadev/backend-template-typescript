import z from 'zod';

const UserAddress = z.object({
  state: z.enum(['RJ', 'SP']),
  cep: z.string().regex(/^[0-9]{5}-[0-9]{3}$/),
  street: z.string().optional(),
});

const CreateUser = z.object({
  name: z.string().min(4).optional(),
  age: z.number().optional(),
  address: UserAddress,
});

export const CreateUserSchema = {
  body: CreateUser,
};

export type CreateUserBody = z.infer<typeof CreateUser>;
