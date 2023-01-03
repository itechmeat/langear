import { PhraseRead } from '@features/phrases/types'

export type SegmentUUID = string

export type SegmentCreate = {
  name: string
  folderId: string
  parentId: SegmentUUID
  lastUserId: string
}

export type Segment = SegmentCreate & {
  id: SegmentUUID
  createdAt: string
  updatedAt: string
  lastUserId: string
}

export type SegmentRead = Segment & {
  phrases: PhraseRead[]
}

export type SegmentReadMapped = Segment & {
  phrases: Map<string, PhraseRead>
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

export type MappedSegment = Map<string, SegmentReadMapped>
export type MappedTree = Map<string, MappedTree | null>
