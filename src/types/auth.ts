export type Role = 'admin' | 'customer'

export type User = {
  id: string
  name: string
  email: string
  role: Role
  accessToken: string
}

declare module 'next-auth' {
  interface Session {
    accessToken: string
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role: Role
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string
    role: Role
    id: string
  }
}
