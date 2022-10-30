import { FC } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { MainLayout } from '@/features/layout/MainLayout/MainLayout'

type ProjectsEditPageType = {}

export const ProjectsEditPage: FC<ProjectsEditPageType> = () => {
  const { id } = useParams()

  return (
    <MainLayout>
      <h1>Edit Project #{id}</h1>

      <p>
        <NavLink to="..">Back to project</NavLink>
      </p>
    </MainLayout>
  )
}
