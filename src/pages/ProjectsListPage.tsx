import { FC } from 'react'
import { Button } from 'ariakit/button'
import { NavLink } from 'react-router-dom'

type ProjectsListPageType = {}

export const ProjectsListPage: FC<ProjectsListPageType> = () => {
  return (
    <div>
      <h1>Your projects</h1>

      <ul>
        <li>
          <NavLink to="1">ProjectsItemPage #1</NavLink>
        </li>
        <li>
          <NavLink to="2">ProjectsItemPage #2</NavLink>
        </li>
        <li>
          <NavLink to="3">ProjectsItemPage #3</NavLink>
        </li>
      </ul>

      <p>
        <Button as="a" href="/projects/create" className="button">
          Add new project
        </Button>
      </p>
    </div>
  )
}
