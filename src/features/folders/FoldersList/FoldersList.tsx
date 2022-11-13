import { FC } from 'react'
import { toast } from 'react-hot-toast'
import { useMutation } from '@apollo/client'
import { DELETE_FOLDER } from '@/features/folders/queries'
import { Folder } from '@/features/folders/types'

type FoldersListType = {
  folders: Folder[]
  canDelete: boolean
  onUpdate: () => void
}

export const FoldersList: FC<FoldersListType> = ({ folders, canDelete, onUpdate }) => {
  const [deleteFolder, { loading: deletingFolder }] = useMutation(DELETE_FOLDER)

  const handleDelete = async (folderId: string) => {
    try {
      await deleteFolder({
        variables: {
          id: folderId,
        },
      })
      onUpdate()
      toast.success('Deleted successfully', { id: 'deleteSegment' })
    } catch (error) {
      toast.error('Unable to delete segment', { id: 'deleteSegment' })
    }
  }

  return (
    <div>
      <h2>Folders</h2>

      {folders.length ? (
        <ul>
          {folders.map((folder: Folder) => (
            <li key={folder.id}>
              {folder.name || folder.id} ({folder?.languages?.map(lang => lang.language).join(' ,')}
              , {folder.format})
              {canDelete && <button onClick={() => handleDelete(folder.id)}>delete</button>}
            </li>
          ))}
        </ul>
      ) : (
        <div>You're alone in the project :(</div>
      )}
    </div>
  )
}
