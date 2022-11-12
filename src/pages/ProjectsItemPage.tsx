import { FC, useEffect, useMemo, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { useAuthenticated, useUserId } from '@nhost/react'
import { GET_PROJECT_BY_ID } from '@/features/projects/queries'
import { ProjectRead } from '@/features/projects/types'

type ProjectsItemPageType = {}

export const ProjectsItemPage: FC<ProjectsItemPageType> = () => {
  const { id: projectId } = useParams()
  const isAuthenticated = useAuthenticated()
  const userId = useUserId()
  const { loading, data, error } = useQuery(GET_PROJECT_BY_ID, {
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

  return (
    <div>
      <h1>{project?.name}</h1>

      <p>{project?.description}</p>

      {isOwner && (
        <p>
          <NavLink to="edit">Edit the project</NavLink>
        </p>
      )}

      <p>
        <NavLink to="..">Back to projects list</NavLink>
      </p>
    </div>
  )
}
