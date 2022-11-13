import { gql } from '@apollo/client'

export const CREATE_SEGMENT = gql`
  mutation CreateSegment($name: String!, $folderId: uuid!, $parentId: uuid, $lastUserId: uuid!) {
    insert_segments_one(
      object: { name: $name, folder_id: $folderId, parent_id: $parentId, last_user_id: $lastUserId }
    ) {
      id
      name
      folderId: folder_id
      parentId: parent_id
      createdAt: created_at
      updatedAt: updated_at
      lastUserId: last_user_id
    }
  }
`

export const UPDATE_SEGMENT = gql`
  mutation UpdateSegment($id: uuid!, $name: String!, $parentId: uuid, $lastUserId: uuid!) {
    update_segments_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name, parent_id: $parentId, last_user_id: $lastUserId }
    ) {
      id
      name
      folderId: folder_id
      parentId: parent_id
      createdAt: created_at
      updatedAt: updated_at
      lastUserId: last_user_id
    }
  }
`

export const DELETE_SEGMENT = gql`
  mutation DeleteSegment($id: uuid!) {
    delete_segments_by_pk(id: $id) {
      id
    }
  }
`

export const AGGREGATE_SEGMENTS_BY_FOLDER_ID = gql`
  subscription AggregateSegmentsByFolderId($id: uuid!, $language: languages_enum!) {
    segments_aggregate(where: { folder_id: { _eq: $id } }) {
      aggregate {
        count
      }
      nodes {
        id
        name
        parentId: parent_id
        folderId: folder_id
        lastUserId: last_user_id
        createdAt: created_at
        updatedAt: updated_at
        phrases(where: { language: { _eq: $language } }) {
          id
          value
          language
          segmentId: segment_id
          lastUserId: last_user_id
          createdAt: created_at
          updatedAt: updated_at
        }
      }
    }
  }
`
