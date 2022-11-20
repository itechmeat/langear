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

export type SegmentLangRow = {
  id: string
  name: string
  phrase?: PhraseRead
  parentId?: string
}

export enum SegmentGridRowTypeEnum {
  string = 'string',
  section = 'section',
  empty = 'empty',
}

export type SegmentGridRowType = `${SegmentGridRowTypeEnum}`

export type SegmentGridRow = SegmentLangRow & {
  type: SegmentGridRowType
  level: number
}
