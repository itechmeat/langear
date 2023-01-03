import { FC, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { useAuthenticated } from '@nhost/react'
import { GET_PROJECTS } from '@/features/projects/queries'
import { Project } from '@/features/projects/types'
import { ContentHeader } from '@/ui/ContentHeader/ContentHeader'
import { ProjectsList } from '@/features/projects/ProjectsList/ProjectsList'
import { Button } from '@/ui/Button/Button'

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
    <div className="page-container">
      <ContentHeader title="Your projects">
        <Button to="create" type="brand" iconStart="add_circle">
          Create new project
        </Button>
      </ContentHeader>

      <ProjectsList list={projects} />
    </div>
  )
}
