export type MockUser = {
  id: string
  email: string
  password: string
  name: string
  accessToken: string
}

export const MOCK_USERS: MockUser[] = [
  {
    id: '1',
    email: 'admin@local.dev',
    password: 'admin123',
    name: 'Admin User',
    accessToken: 'mock-admin-token',
  },
  {
    id: '2',
    email: 'customer@local.dev',
    password: 'customer123',
    name: 'John Doe',
    accessToken: 'mock-customer-token',
  },
]
