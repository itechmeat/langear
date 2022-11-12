export enum Language {
  en = 'en',
  de = 'de',
}

export const langList: {
  key: string
  value: string
}[] = Object.entries(Language).map(([key, value]) => ({ key, value }))

export enum Format {
  json = 'json',
  yaml = 'yaml',
  xml = 'xml',
}

export const formatList: {
  key: string
  value: string
}[] = Object.entries(Format).map(([key, value]) => ({ key, value }))
