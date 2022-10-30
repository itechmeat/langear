import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { MainLayout } from '@/features/layout/MainLayout/MainLayout'

type ProjectsCreatePageType = {}

export const ProjectsCreatePage: FC<ProjectsCreatePageType> = () => {
  return (
    <MainLayout>
      <h1>Create new project</h1>

      <p>
        <NavLink to="..">Back to projects list</NavLink>
      </p>
    </MainLayout>
  )
}
