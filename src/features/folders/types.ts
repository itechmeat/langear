import { SegmentRead } from '@/features/segments/types'

export type FolderLanguage = {
  language: string
  customName: string
}

export type FolderUpdate = {
  id: string
  name: string
  format: string
  languages: FolderLanguage[]
  segmentsOrder: string[]
}

export type FolderCreate = Omit<FolderUpdate, 'id'> & {
  projectId: string
}

export type Folder = FolderUpdate &
  FolderCreate & {
    createdAt: string
    updatedAt: string
  }

export type FolderRead = Folder & {
  segments: SegmentRead[]
}
