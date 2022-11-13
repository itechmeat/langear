import { FC } from 'react'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'
import { MainLayout } from '@/features/layout/MainLayout/MainLayout'
import { ProtectedRoute } from '@/features/user/Auth/ProtectedRoute'
import { HomePage } from '@/pages/HomePage'
import { DashboardPage } from '@/pages/DashboardPage'
import { ProjectsListPage } from '@/pages/ProjectsListPage'
import { ProjectsCreatePage } from '@/pages/ProjectsCreatePage'
import { ProjectsItemPage } from '@/pages/ProjectsItemPage'
import { ProjectsEditPage } from '@/pages/ProjectsEditPage'
import { ProjectsFolderPage } from '@/pages/ProjectsFolderPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<HomePage />} />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
      </Route>
      <Route
        path="projects"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ProjectsListPage />} />
        <Route path="create" element={<ProjectsCreatePage />} />
        <Route path=":projectId">
          <Route index element={<ProjectsItemPage />} />
          <Route path="edit" element={<ProjectsEditPage />} />
          <Route path=":folderId">
            <Route index element={<ProjectsFolderPage />} />
            <Route path=":lang" element={<ProjectsFolderPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
)

export const Router: FC = () => {
  return <RouterProvider router={router} />
}
