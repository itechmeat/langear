import { User } from '@/features/user/types'

export enum MembersRoles {
  owner = 'owner',
  admin = 'admin',
  developer = 'developer',
  designer = 'designer',
  translator = 'translator',
  reader = 'reader',
}

export type MemberUpdate = {
  id: string
  role: MembersRoles
}

export type MemberCreate = Omit<MemberUpdate, 'id'> & {
  projectId: string
  userId: string
}

export type Member = MemberCreate &
  MemberUpdate & {
    createdAt: string
    updatedAt: string
    user: User
  }
