export type PhraseCreate = {
  value: string
  language: string
  segmentId: string
  lastUserId: string
}

export type PhraseUpdate = Omit<PhraseCreate, 'segmentId'> & {
  id: string
}

export type PhraseRead = PhraseCreate & PhraseUpdate
