import { FC } from 'react'
import { NavLink, useParams } from 'react-router-dom'

type ProjectsEditPageType = {}

export const ProjectsEditPage: FC<ProjectsEditPageType> = () => {
  const { id } = useParams()

  return (
    <div>
      <h1>Edit Project #{id}</h1>

      <p>
        <NavLink to="..">Back to project</NavLink>
      </p>
    </div>
  )
}
