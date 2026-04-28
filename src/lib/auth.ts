import { getServerSession } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import type { NextAuthOptions, Session } from 'next-auth'
import type { Role } from '@/src/types/auth'
import { MOCK_USERS } from '@/src/modules/auth/mock'

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string
          password: string
        }
        const user = MOCK_USERS.find(
          (u) => u.email === email && u.password === password
        )
        if (!user) return null
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          accessToken: user.accessToken,
        }
      },
    }),
  ],

  pages: {
    signIn: '/login',
    signOut: '/login',
  },

  session: { strategy: 'jwt' },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as typeof user & {accessToken: string }
        token.id = u.id
        token.accessToken = u.accessToken
      }
      return token
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      session.user.id = token.id as string
      session.user.role = token.role as Role
      return session
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
}

export async function getServerAuthSession(): Promise<Session | null> {
  return getServerSession(authOptions)
}
