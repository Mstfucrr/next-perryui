export interface ICurrentUserInfo {
  id: string
  email: string
  roleId: string
  name: string
  permissions: string[]
}

const users: ICurrentUserInfo[] = [
  {
    id: '1',
    email: 'test@test.com',
    roleId: '1',
    name: 'Test User',
    permissions: ['a-1', 'a-2', 'a-3']
  },
  {
    id: '2',
    email: 'test2@test.com',
    roleId: '2',
    name: 'Test User 2',
    permissions: ['a-1', 'b-2', 'c-3']
  },
  {
    id: '3',
    email: 'test3@test.com',
    roleId: '3',
    name: 'Test User 3',
    permissions: ['a-3', 'b-3', 'c-3']
  }
]
