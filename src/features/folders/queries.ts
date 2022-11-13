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
      languages
      format
      segments {
        id
        name
        folderId: folder_id
        parentId: parent_id
        createdAt: created_at
        updatedAt: updated_at
        lastUserId: last_user_id
        phrases {
          id
          value
          language
          createdAt: created_at
          updatedAt: updated_at
          segmentId: segment_id
          lastUserId: last_user_id
        }
      }
    }
  }
`
