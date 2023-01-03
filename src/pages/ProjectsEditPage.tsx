import { FC, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { useAuthenticated, useUserId } from '@nhost/react'
import { toast } from 'react-hot-toast'
import { useDialogState } from 'ariakit/dialog'
import { DELETE_PROJECT, GET_PROJECT_BY_ID } from '@/features/projects/queries'
import { ProjectRead } from '@/features/projects/types'
import { MembersList } from '@/features/members/MembersList/MembersList'
import { AddMemberForm } from '@/features/members/AddMemberForm/AddMemberForm'
import { FoldersList } from '@/features/folders/FoldersList/FoldersList'
import { AddFolderForm } from '@/features/folders/AddFolderForm/AddFolderForm'
import { EditProjectForm } from '@/features/projects/EditProjectForm/EditProjectForm'
import { ContentHeader } from '@/ui/ContentHeader/ContentHeader'
import { Button } from '@/ui/Button/Button'
import { Dialog } from '@/ui/Dialog/Dialog'

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

  const addMemberDialog = useDialogState()
  const createFolderDialog = useDialogState()
  const deleteDialog = useDialogState()

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

  const handleMemberSubmit = () => {
    refetch()
    addMemberDialog.hide()
  }

  const handleFolderSubmit = () => {
    refetch()
    createFolderDialog.hide()
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
    <div className="page-container">
      <ContentHeader title={project?.name} backLink="..">
        {isOwner && !isEdited && (
          <>
            <Button type="danger" iconStart="delete" outlined onClick={deleteDialog.show}>
              Delete
            </Button>
            <Button type="brand" iconStart="edit" onClick={() => setEditedState(true)}>
              Edit content
            </Button>
          </>
        )}
      </ContentHeader>

      {!isEdited && <p>{project?.description}</p>}

      {isEdited && project && (
        <EditProjectForm project={project} onCancel={() => setEditedState(false)} onSave={update} />
      )}

      <ContentHeader title="Members" level={2}>
        {projectId && isOwner && (
          <Button type="brand" iconStart="add" onClick={addMemberDialog.show} />
        )}
      </ContentHeader>
      {project && <MembersList members={project.members} canDelete={isOwner} onUpdate={refetch} />}
      {addMemberDialog.open && (
        <Dialog dialog={addMemberDialog} title="Add new member to the project">
          {projectId && isOwner && (
            <AddMemberForm
              projectId={projectId}
              onSubmit={handleMemberSubmit}
              onCancel={addMemberDialog.hide}
            />
          )}
        </Dialog>
      )}

      <ContentHeader title="Folders" level={2}>
        {project && isOwner && projectId && (
          <Button type="brand" iconStart="add" onClick={createFolderDialog.show} />
        )}
      </ContentHeader>
      {project && <FoldersList folders={project.folders} canDelete={isOwner} onUpdate={refetch} />}
      {createFolderDialog.open && (
        <Dialog dialog={createFolderDialog} title="Add new folder to the project">
          {project && isOwner && projectId && (
            <AddFolderForm
              projectId={projectId}
              suggestedName={
                !project?.folders?.length
                  ? 'Default folder'
                  : `New folder ${project.folders.length + 1}`
              }
              onCancel={createFolderDialog.hide}
              onSubmit={handleFolderSubmit}
            />
          )}
        </Dialog>
      )}

      {deleteDialog.open && (
        <Dialog
          dialog={deleteDialog}
          title="Are you sure?"
          cancelText="Cancel"
          confirmText="Delete"
          confirmType="danger"
          onCancel={deleteDialog.hide}
          onConfirm={handleDelete}
        >
          The project will be permanently removed!
        </Dialog>
      )}
    </div>
  )
}
