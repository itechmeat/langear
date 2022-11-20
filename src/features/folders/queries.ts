import { gql } from '@apollo/client'

export const CREATE_FOLDER = gql`
  mutation CreateFolder(
    $name: String!
    $projectId: uuid!
    $languages: jsonb!
    $format: formats_enum!
  ) {
    insert_folders_one(
      object: { name: $name, project_id: $projectId, languages: $languages, format: $format }
    ) {
      id
      name
      createdAt: created_at
      updatedAt: updated_at
      projectId: project_id
      languages
      format
    }
  }
`

export const UPDATE_FOLDER = gql`
  mutation UpdateFolder(
    $id: uuid!
    $name: String!
    $languages: jsonb!
    $format: formats_enum!
    $segmentsOrder: jsonb
  ) {
    update_folders_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name, languages: $languages, format: $format, segments_order: $segmentsOrder }
    ) {
      id
      name
      createdAt: created_at
      updatedAt: updated_at
      projectId: project_id
      segmentsOrder: segments_order
      languages
      format
    }
  }
`

export const DELETE_FOLDER = gql`
  mutation DeleteFolder($id: uuid!) {
    delete_folders_by_pk(id: $id) {
      id
    }
  }
`

export const GET_FOLDER_BY_ID = gql`
  subscription FolderById($id: uuid!) {
    folders_by_pk(id: $id) {
      id
      name
      createdAt: created_at
      updatedAt: updated_at
      projectId: project_id
      segmentsOrder: segments_order
      languages
      format
    }
  }
`
