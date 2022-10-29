import { FC } from 'react'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { ProjectsListPage } from '@/pages/ProjectsListPage'
import { ProjectsCreatePage } from '@/pages/ProjectsCreatePage'
import { ProjectsItemPage } from '@/pages/ProjectsItemPage'
import { ProjectsEditPage } from '@/pages/ProjectsEditPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<HomePage />} />
      <Route path="dashboard" element={<HomePage />} />
      <Route path="projects">
        <Route index element={<ProjectsListPage />} />
        <Route path="create" element={<ProjectsCreatePage />} />
        <Route path=":id">
          <Route index element={<ProjectsItemPage />} />
          <Route path="edit" element={<ProjectsEditPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
)

export const Router: FC = () => {
  return <RouterProvider router={router} />
}
