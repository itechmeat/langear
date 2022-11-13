import { FC } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useMutation, useQuery, useSubscription } from '@apollo/client'
import { useAuthenticated, useUserId } from '@nhost/react'
import { toast } from 'react-hot-toast'
import { GET_PROJECT_BY_ID } from '@/features/projects/queries'
import { GET_FOLDER_BY_ID } from '@/features/folders/queries'
import { ProjectRead } from '@/features/projects/types'
import { FolderRead } from '@/features/folders/types'
import { CREATE_SEGMENT, DELETE_SEGMENT } from '@/features/segments/queries'
import { FolderBoard } from '@/features/folders/FolderBoard/FolderBoard'

type ProjectsFolderPageType = {}

export const ProjectsFolderPage: FC<ProjectsFolderPageType> = () => {
  const { projectId, folderId, lang } = useParams()
  const isAuthenticated = useAuthenticated()
  const userId = useUserId()
  const {
    loading: projectLoading,
    data: projectData,
    error: projectError,
  } = useQuery(GET_PROJECT_BY_ID, {
    variables: { id: projectId },
  })
  const {
    loading: folderLoading,
    data: folderData,
    error: folderError,
  } = useSubscription(GET_FOLDER_BY_ID, {
    variables: { id: folderId },
  })

  const project: ProjectRead = projectData?.projects_by_pk
  const folder: FolderRead = folderData?.folders_by_pk
  let currentLanguage = folder?.languages[0]?.language
  if (lang && folder?.languages?.map(item => item.language).includes(lang)) {
    currentLanguage = lang
  }

  const [createSegment, { loading: creatingFolder }] = useMutation(CREATE_SEGMENT)
  const [deleteSegment, { loading: deletingFolder }] = useMutation(DELETE_SEGMENT)

  const handleAddSegment = async () => {
    const name = prompt('Name?') || ''
    try {
      await createSegment({
        variables: {
          name,
          folderId,
          lastUserId: userId,
        },
      })
      toast.success('Segment added successfully', { id: 'addSegment' })
    } catch (error) {
      toast.error('Unable to add segment', { id: 'addSegment' })
    }
  }

  const handleDeleteSegment = async (id: string) => {
    const isConfirmed = confirm('Are you sure you want to delete this segment?')
    if (!isConfirmed) return
    try {
      await deleteSegment({
        variables: {
          id,
        },
      })
      toast.success('Deleted successfully', { id: 'deleteFolder' })
    } catch (error) {
      toast.error('Unable to delete folder', { id: 'deleteFolder' })
    }
  }

  if (!isAuthenticated) {
    return <div>You must be authenticated to see this page</div>
  }

  if (projectLoading || folderLoading) {
    return <div>Loading...</div>
  }

  if (projectError || folderError) {
    return <div>Error in the query {projectError?.message || folderError?.message}</div>
  }

  if (!folder) {
    return <div>Something wrong</div>
  }

  return (
    <div>
      <h1>
        {project?.name} / {folder.name} ({currentLanguage})
      </h1>

      <p>{project?.description}</p>

      <FolderBoard
        folder={folder}
        currentLanguage={currentLanguage}
        onCreate={handleAddSegment}
        onDelete={handleDeleteSegment}
      />

      <p>
        <NavLink to="..">Back to project</NavLink>
      </p>
    </div>
  )
}
