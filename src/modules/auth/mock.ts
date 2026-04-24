export type MockUser = {
  id: string
  email: string
  password: string
  name: string
  role: 'admin' | 'customer'
  accessToken: string
}

export const MOCK_USERS: MockUser[] = [
  {
    id: '1',
    email: 'admin@local.dev',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    accessToken: 'mock-admin-token',
  },
  {
    id: '2',
    email: 'customer@local.dev',
    password: 'customer123',
    name: 'John Doe',
    role: 'customer',
    accessToken: 'mock-customer-token',
  },
]
