import { FC, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { useAuthenticated } from '@nhost/react'
import { GET_PROJECTS } from '@/features/projects/queries'
import { Project } from '@/features/projects/types'
import { ContentHeader } from '@/ui/ContentHeader/ContentHeader'

type ProjectsListPageType = {}

export const ProjectsListPage: FC<ProjectsListPageType> = () => {
  const isAuthenticated = useAuthenticated()
  const { loading, data, error, refetch } = useQuery(GET_PROJECTS)

  const projects: Project[] = data?.projects

  useEffect(() => {
    if (data) {
      refetch()
    }
  }, [data])

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
      <ContentHeader title="Your projects" />

      {projects?.length ? (
        <ul>
          {projects.map((project: Project) => (
            <li key={project.id}>
              <NavLink to={project.id}>{project.name}</NavLink>
            </li>
          ))}
        </ul>
      ) : (
        <div>You don't have any projects</div>
      )}

      <p>
        <NavLink to="create" className="button">
          Add new project
        </NavLink>
      </p>
    </div>
  )
}
