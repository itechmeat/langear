import { PhraseRead } from '@features/phrases/types'

export type SegmentCreate = {
  name: string
  folderId: string
  parentId: string
  lastUserId: string
}

export type Segment = SegmentCreate & {
  id: string
  createdAt: string
  updatedAt: string
  lastUserId: string
}

export type SegmentRead = Segment & {
  phrases: PhraseRead[]
}
