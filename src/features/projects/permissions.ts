export const SELECT = `{"_or":[{"owner_id":{"_eq":"X-Hasura-User-Id"}},{"members":{"user_id":{"_eq":"X-Hasura-User-Id"}}}]}`
// all columns

export const INSERT = `{"owner_id":{"_eq":"X-Hasura-User-Id"}}`
// all columns

export const UPDATE = `{"owner_id":{"_eq":"X-Hasura-User-Id"}}`
// all columns

export const DELETE = `{"owner_id":{"_eq":"X-Hasura-User-Id"}}`
