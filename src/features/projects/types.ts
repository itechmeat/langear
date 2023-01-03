import { User } from '@/features/user/types'
import { Member } from '@/features/members/types'
import { Folder } from '@/features/folders/types'

export type ProjectUpdate = {
  id: string
  name: string
  description?: string
}

export type ProjectCreate = Omit<ProjectUpdate, 'id'>

export type Project = ProjectUpdate & {
  createdAt: string
  updatedAt: string
  ownerId?: string
  user: User
  members: Member[]
  folders: Folder[]
}

export type ProjectRead = Project & {
  folders: Folder[]
  members: Member[]
  user: User
}
