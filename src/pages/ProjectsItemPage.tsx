import { FC, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { useAuthenticated, useUserId } from '@nhost/react'
import { GET_PROJECT_BY_ID } from '@/features/projects/queries'
import { ProjectRead } from '@/features/projects/types'
import { FoldersList } from '@/features/folders/FoldersList/FoldersList'
import { ContentHeader } from '@/ui/ContentHeader/ContentHeader'
import { Button } from '@/ui/Button/Button'

type ProjectsItemPageType = {}

export const ProjectsItemPage: FC<ProjectsItemPageType> = () => {
  const { projectId } = useParams()
  const isAuthenticated = useAuthenticated()
  const userId = useUserId()
  const { loading, data, error, refetch } = useQuery(GET_PROJECT_BY_ID, {
    variables: { id: projectId },
  })

  const project: ProjectRead = data?.projects_by_pk

  const isOwner = useMemo(() => {
    return project?.ownerId === userId
  }, [project, userId])

  if (!isAuthenticated) {
    return <div>You must be authenticated to see this page</div>
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error in the query {error.message}</div>
  }

  if (!project) {
    return <h1>Project not found</h1>
  }

  return (
    <div className="page-container">
      <ContentHeader title={project?.name} backLink="..">
        {isOwner && (
          <Button to="edit" type="brand" iconStart="edit">
            Edit the project
          </Button>
        )}
      </ContentHeader>
      <p>{project.description}</p>

      {project && <FoldersList folders={project.folders} canDelete={isOwner} onUpdate={refetch} />}
    </div>
  )
}
