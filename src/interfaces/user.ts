export type TRole = 'USER' | 'ADMIN'

export interface IUser {
  id: string
  name: string
  email: string
  photo: string | null
  role: TRole
  access_token: string
}
