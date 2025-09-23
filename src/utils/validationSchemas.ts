import { object, string } from 'yup'

export const userSchema = object({
  name: string()
    .required('Nome é obrigatório')
    .label('Nome'),
  email: string()
    .email('E-mail inválido')
    .required('E-mail é obrigatório')
    .label('E-mail'),
  password: string()
    .required('Senha é obrigatória')
    .label('Senha'),
  role: string()
    .required('Cargo é obrigatório')
    .label('Cargo')
})

