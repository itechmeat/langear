import { gql } from '@apollo/client'

export const GET_PROJECTS = gql`
  query MyProjects {
    projects(order_by: { updated_at: desc }) {
      id
      name
      description
      ownerId: owner_id
      createdAt: created_at
      updatedAt: updated_at
      user {
        id
        displayName
        avatarUrl
        emailVerified
      }
      members {
        id
        role
        userId: user_id
        projectId: project_id
        createdAt: created_at
        updatedAt: updated_at
        user {
          id
          displayName
          emailVerified
          avatarUrl
        }
      }
      folders(order_by: { updated_at: desc }) {
        id
        name
        projectId: project_id
        createdAt: created_at
        updatedAt: updated_at
        languages
        format
        segmentsAggregate: segments_aggregate {
          aggregate {
            count
          }
        }
      }
    }
  }
`

export const CREATE_PROJECT = gql`
  mutation CreateProject($name: String!, $description: String) {
    insert_projects_one(object: { name: $name, description: $description }) {
      id
      name
      description
      ownerId: owner_id
      createdAt: created_at
      updatedAt: updated_at
      user {
        id
        displayName
        avatarUrl
        emailVerified
      }
    }
  }
`

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: uuid!, $name: String, $description: String) {
    update_projects_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name, description: $description }
    ) {
      id
      name
      description
      ownerId: owner_id
      createdAt: created_at
      updatedAt: updated_at
      user {
        id
        displayName
        avatarUrl
        emailVerified
      }
    }
  }
`

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: uuid!) {
    delete_projects_by_pk(id: $id) {
      id
    }
  }
`

export const GET_PROJECT_BY_ID = gql`
  query ProjectById($id: uuid!) {
    projects_by_pk(id: $id) {
      id
      name
      description
      ownerId: owner_id
      createdAt: created_at
      updatedAt: updated_at
      user {
        id
        displayName
        avatarUrl
        emailVerified
      }
      members(where: { project_id: { _eq: $id } }) {
        id
        role
        userId: user_id
        projectId: project_id
        createdAt: created_at
        updatedAt: updated_at
        user {
          id
          displayName
          emailVerified
          avatarUrl
        }
      }
      folders(order_by: { updated_at: desc }, where: { project_id: { _eq: $id } }) {
        id
        name
        projectId: project_id
        createdAt: created_at
        updatedAt: updated_at
        languages
        format
        segmentsAggregate: segments_aggregate {
          aggregate {
            count
          }
        }
      }
    }
  }
`
