import { FC, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useMutation, useQuery, useSubscription } from '@apollo/client'
import { useAuthenticated, useUserId } from '@nhost/react'
import { toast } from 'react-hot-toast'
import { GET_PROJECT_BY_ID } from '@/features/projects/queries'
import { GET_FOLDER_BY_ID, UPDATE_FOLDER } from '@/features/folders/queries'
import { ProjectRead } from '@/features/projects/types'
import { FolderRead } from '@/features/folders/types'
import { SegmentRead } from '@/features/segments/types'
import {
  AGGREGATE_SEGMENTS_BY_FOLDER_ID,
  CREATE_SEGMENT,
  DELETE_SEGMENT,
} from '@/features/segments/queries'
import { FolderBoard } from '@/features/folders/FolderBoard/FolderBoard'
import { FolderBoardFooter } from '@/features/folders/FolderBoardFooter/FolderBoardFooter'
import { FolderLangSwitcher } from '@/features/folders/FolderLangSwitcher/FolderLangSwitcher'

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

  const {
    loading: segmentsLoading,
    data: segmentsData,
    error: segmentsError,
  } = useSubscription(AGGREGATE_SEGMENTS_BY_FOLDER_ID, {
    variables: { id: folderId, language: currentLanguage },
  })
  const segments = segmentsData?.segments_aggregate?.nodes as SegmentRead[]

  const [updateFolder, { loading: updatingFolder }] = useMutation(UPDATE_FOLDER)
  const [createSegment, { loading: creatingFolder }] = useMutation(CREATE_SEGMENT)
  const [deleteSegment, { loading: deletingFolder }] = useMutation(DELETE_SEGMENT)

  const defineSegmentsOrder = (): string[] => {
    const order = folder?.segmentsOrder
    const newSegmentsInOrder: string[] = []
    segments.forEach(segment => {
      if (!order.includes(segment.id)) {
        newSegmentsInOrder.push(segment.id)
      }
    })
    return [...order, ...newSegmentsInOrder]
  }

  const changeFolder = async (order: string[]) => {
    try {
      await updateFolder({
        variables: {
          id: folder.id,
          name: folder.name,
          format: folder.format,
          languages: folder.languages,
          segmentsOrder: order,
        },
      })
      toast.success('Folder updated successfully', { id: 'updateFolder' })
    } catch (error) {
      toast.error('Unable to update project', { id: 'updateFolder' })
    }
  }

  const handleAddSegment = async () => {
    const name = prompt('Name?') || ''
    if (!name?.length) return
    const order = defineSegmentsOrder()
    try {
      const newSegment = await createSegment({
        variables: {
          name,
          folderId,
          lastUserId: userId,
        },
      })
      changeFolder([...order, newSegment?.data?.insert_segments_one?.id])
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
      const order = [...folder?.segmentsOrder]
      const index = order.findIndex(item => item === id)
      if (index !== -1) {
        order.splice(index, 1)
        changeFolder(order)
      }
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
        segments={segments}
        order={folder.segmentsOrder}
        isLoading={segmentsLoading}
        errorMessage={segmentsError?.message}
        currentLanguage={currentLanguage}
        onCreate={handleAddSegment}
        onDelete={handleDeleteSegment}
      />

      <p>
        <NavLink to="..">Back to project</NavLink>
      </p>

      <FolderBoardFooter>
        <FolderLangSwitcher currentLanguage={currentLanguage} folder={folder} />
      </FolderBoardFooter>
    </div>
  )
}
