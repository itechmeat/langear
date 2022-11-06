import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import { useAuthenticated } from '@nhost/react'

const GET_PROJECTS = gql`
  query MyProjects {
    projects {
      id
      name
      description
    }
  }
`

type ProjectsListPageType = {}

export const ProjectsListPage: FC<ProjectsListPageType> = () => {
  const isAuthenticated = useAuthenticated()
  const { loading, data, error } = useQuery(GET_PROJECTS)

  if (loading) {
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
      <h1>Your projects</h1>

      <ul>
        {data?.projects?.map((project: any) => (
          <li key={project.id}>
            <NavLink to={project.id}>{project.name}</NavLink>
          </li>
        ))}
      </ul>

      <p>
        <NavLink to="create" className="button">
          Add new project
        </NavLink>
      </p>
    </div>
  )
}
