import { FC, useEffect, useMemo, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { useAuthenticated, useUserId } from '@nhost/react'
import { EditProjectForm } from '@/features/projects/EditProjectForm/EditProjectForm'
import { toast } from 'react-hot-toast'
import { DELETE_PROJECT, GET_PROJECT_BY_ID } from '@/features/projects/queries'
import { ProjectRead } from '@/features/projects/types'
import { MembersList } from '@/features/members/MembersList/MembersList'
import { AddMemberForm } from '@/features/members/AddMemberForm/AddMemberForm'
import { FoldersList } from '@/features/folders/FoldersList/FoldersList'
import { AddFolderForm } from '@/features/folders/AddFolderForm/AddFolderForm'
import { ContentHeader } from '@/ui/ContentHeader/ContentHeader'
import { Button } from '@/ui/Button/Button'

type ProjectsEditPageType = {}

export const ProjectsEditPage: FC<ProjectsEditPageType> = () => {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const isAuthenticated = useAuthenticated()
  const userId = useUserId()
  const [isEdited, setEditedState] = useState(false)
  const { loading, data, error, refetch } = useQuery(GET_PROJECT_BY_ID, {
    variables: { id: projectId },
  })

  const [deleteProject, { loading: deletingProject }] = useMutation(DELETE_PROJECT)

  const [project, setProject] = useState<ProjectRead>(data?.projects_by_pk)
  const isOwner = useMemo(() => {
    return project?.ownerId === userId
  }, [project, userId])

  useEffect(() => {
    if (data?.projects_by_pk) {
      setProject(data.projects_by_pk)
    }
  }, [data])

  const update = () => {
    refetch()
    setEditedState(false)
  }

  const handleDelete = async () => {
    if (!projectId) return
    try {
      await deleteProject({
        variables: {
          id: projectId,
        },
      })
      toast.success('Deleted successfully', { id: 'deleteProject' })
      navigate(`../..`)
    } catch (error) {
      toast.error('Unable to delete project', { id: 'deleteProject' })
    }
  }

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
      <ContentHeader title={project?.name} backLink="..">
        {isOwner && !isEdited && (
          <>
            <Button type="danger" iconStart="delete" outlined onClick={handleDelete}>
              Delete
            </Button>
            <Button type="brand" iconStart="edit" onClick={() => setEditedState(true)}>
              Edit content
            </Button>
          </>
        )}
      </ContentHeader>

      {!isEdited && <p>{project?.description}</p>}

      {isEdited && project && <EditProjectForm project={project} onSave={update} />}

      <ContentHeader title="Members" level={2} />
      {project && <MembersList members={project.members} canDelete={isOwner} onUpdate={refetch} />}
      {projectId && isOwner && <AddMemberForm projectId={projectId} onUpdate={refetch} />}

      <ContentHeader title="Folders" level={2} />
      {project && <FoldersList folders={project.folders} canDelete={isOwner} onUpdate={refetch} />}
      {project && isOwner && projectId && (
        <AddFolderForm
          projectId={projectId}
          suggestedName={
            !project?.folders?.length
              ? 'Default folder'
              : `New folder ${project.folders.length + 1}`
          }
          onUpdate={refetch}
        />
      )}
    </div>
  )
}
