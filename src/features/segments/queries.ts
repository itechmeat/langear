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
