export type FolderUpdate = {
  id: string
  name: string
  language: string
  format: string
}

export type FolderCreate = Omit<FolderUpdate, 'id'> & {
  projectId: string
}

export type Folder = FolderUpdate &
  FolderCreate & {
    createdAt: string
    updatedAt: string
  }
