import { object, string } from 'yup'

export const bookingSchema = object({
  firstname: string()
    .required('O nome é obrigatório')
    .label('Nome'),
  lastname: string()
    .required('O sobrenome é obrigatório')
    .label('Sala'),
  checkin: string()
    .required('Data do checking é obrigatória'),
})
