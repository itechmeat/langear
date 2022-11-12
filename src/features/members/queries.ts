import { gql } from '@apollo/client'

export const GET_MEMBERS_BY_PROJECT_ID = gql`
  query GetMembersByProjectId($projectId: uuid!) {
    members(where: { project_id: { _eq: $projectId } }) {
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
  }
`

export const ADD_MEMBER = gql`
  mutation AddMember($projectId: uuid!, $userId: uuid!, $role: roles_enum!) {
    insert_members_one(object: { project_id: $projectId, user_id: $userId, role: $role }) {
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
  }
`

export const SEARCH_USER = gql`
  query SearchUser($email: citext!) {
    users(where: { email: { _eq: $email } }) {
      id
      displayName
      email
      emailVerified
      avatarUrl
    }
  }
`

export const DELETE_MEMBER = gql`
  mutation DeleteMember($id: uuid!) {
    delete_members_by_pk(id: $id) {
      id
    }
  }
`
