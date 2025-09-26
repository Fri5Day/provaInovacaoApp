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

export const roomSchema = object({
  name: string()
    .required('Nome é obrigatório')
    .label('Nome'),
  size: string()
    .required('Capacidade é obrigatório')
    .label('Capacidade'),
})

export const bookingSchema = object({
  name: string()
    .required('O Título da reserva é obrigatório')
    .label('Nome'),
  room_id: string()
    .required('A sala é obrigatória')
    .label('Sala'),
  dateInit: string()
    .required('Data de início é obrigatória'),
  dateEnd: string()
    .required('Data de término é obrigatória')
})


