import { gql } from '@apollo/client'

export const CREATE_FOLDER = gql`
  mutation CreateFolder(
    $name: String!
    $projectId: uuid!
    $language: languages_enum!
    $format: formats_enum!
  ) {
    insert_folders_one(
      object: { name: $name, project_id: $projectId, language: $language, format: $format }
    ) {
      id
      name
      createdAt: created_at
      updatedAt: updated_at
      projectId: project_id
      language
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
