import { FC, useCallback } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useAuthenticated } from '@nhost/react'
import { toast } from 'react-hot-toast'

const GET_PROJECT = gql`
  query ProjectById($id: uuid!) {
    projects_by_pk(id: $id) {
      id
      name
      description
    }
  }
`

const DELETE_PROJECT = gql`
  mutation DeleteProject($id: uuid!) {
    delete_projects_by_pk(id: $id) {
      id
    }
  }
`

type ProjectsItemPageType = {}

export const ProjectsItemPage: FC<ProjectsItemPageType> = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isAuthenticated = useAuthenticated()
  const { loading, data, error } = useQuery(GET_PROJECT, {
    variables: { id },
  })
  const [deleteProject, { loading: deletingProject }] = useMutation(DELETE_PROJECT)

  const handleDelete = useCallback(async () => {
    if (!id) return
    try {
      await deleteProject({
        variables: {
          id,
        },
      })
      toast.success('Deleted successfully', { id: 'updateProject' })
      navigate(`..`)
    } catch (error) {
      toast.error('Unable to delete project', { id: 'updateProject' })
    }
  }, [])

  if (loading || deletingProject) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <div>You must be authenticated to see this page</div>
  }

  if (error) {
    return <div>Error in the query {error.message}</div>
  }

  return (
    <div>
      <h1>{data.projects_by_pk.name}</h1>

      <p>{data.projects_by_pk.description}</p>

      <p>
        <NavLink to="edit">Edit the project</NavLink>
      </p>

      <p>
        <button onClick={handleDelete}>delete</button>
      </p>

      <p>
        <NavLink to="..">Back to projects list</NavLink>
      </p>
    </div>
  )
}
