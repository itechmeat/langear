import { FC } from 'react'
import { NavLink } from 'react-router-dom'

type ProjectsCreatePageType = {}

export const ProjectsCreatePage: FC<ProjectsCreatePageType> = () => {
  return (
    <div>
      <h1>Create new project</h1>

      <p>
        <NavLink to="..">Back to projects list</NavLink>
      </p>
    </div>
  )
}
