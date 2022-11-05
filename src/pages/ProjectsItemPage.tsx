import { FC } from 'react'
import { NavLink, useParams } from 'react-router-dom'

type ProjectsItemPageType = {}

export const ProjectsItemPage: FC<ProjectsItemPageType> = () => {
  const { id } = useParams()

  return (
    <div>
      <h1>Project #{id}</h1>

      <p>
        <NavLink to="edit">Edit the project</NavLink>
      </p>

      <p>
        <NavLink to="..">Back to projects list</NavLink>
      </p>
    </div>
  )
}
