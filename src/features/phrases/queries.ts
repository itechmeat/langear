import { gql } from '@apollo/client'

export const CREATE_PHRASE = gql`
  mutation CreatePhrase(
    $value: String!
    $segmentId: uuid!
    $lastUserId: uuid!
    $language: languages_enum
  ) {
    insert_phrases_one(
      object: {
        value: $value
        segment_id: $segmentId
        last_user_id: $lastUserId
        language: $language
      }
    ) {
      id
      value
      segmentId: segment_id
      language: language
      createdAt: created_at
      updatedAt: updated_at
      lastUserId: last_user_id
    }
  }
`

export const UPDATE_PHRASE = gql`
  mutation UpdatePhrase($id: uuid!, $value: String!, $lastUserId: uuid!) {
    update_phrases_by_pk(
      pk_columns: { id: $id }
      _set: { value: $value, last_user_id: $lastUserId }
    ) {
      id
      value
      segmentId: segment_id
      language: language
      createdAt: created_at
      updatedAt: updated_at
      lastUserId: last_user_id
    }
  }
`
