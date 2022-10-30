import { FC } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { MainLayout } from '@/features/layout/MainLayout/MainLayout'

type ProjectsItemPageType = {}

export const ProjectsItemPage: FC<ProjectsItemPageType> = () => {
  const { id } = useParams()

  return (
    <MainLayout>
      <h1>Project #{id}</h1>

      <p>
        <NavLink to="edit">Edit the project</NavLink>
      </p>

      <p>
        <NavLink to="..">Back to projects list</NavLink>
      </p>
    </MainLayout>
  )
}
