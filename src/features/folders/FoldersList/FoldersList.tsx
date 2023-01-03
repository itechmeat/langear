import { FC, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useMutation } from '@apollo/client'
import { useDialogState } from 'ariakit/dialog'
import { DELETE_FOLDER } from '@/features/folders/queries'
import { Folder } from '@/features/folders/types'
import { Card } from '@/ui/Card/Card'
import { Button } from '@/ui/Button/Button'
import { Dialog } from '@/ui/Dialog/Dialog'
import styles from './FoldersList.module.scss'

type FoldersListType = {
  folders: Folder[]
  canDelete: boolean
  onUpdate: () => void
}

export const FoldersList: FC<FoldersListType> = ({ folders, canDelete, onUpdate }) => {
  const [deleteFolder, { loading: deletingFolder }] = useMutation(DELETE_FOLDER)
  const dialog = useDialogState()

  const [deletedFolderId, setDeletedFolderId] = useState('')

  const clearState = () => {
    setDeletedFolderId('')
    dialog.toggle()
  }

  const askDelete = (folderId: string) => {
    setDeletedFolderId(folderId)
    dialog.toggle()
  }

  const handleDelete = async () => {
    try {
      await deleteFolder({
        variables: {
          id: deletedFolderId,
        },
      })
      onUpdate()
      toast.success('Deleted successfully', { id: 'deleteSegment' })
    } catch (error) {
      toast.error('Unable to delete segment', { id: 'deleteSegment' })
    }
    clearState()
  }

  if (!folders.length) return <div>You don't have any folders in the project</div>

  return (
    <>
      <ul className={styles.list}>
        {folders.map((folder: Folder) => (
          <li className={styles.item} key={folder.id}>
            <Card
              title={folder.name || folder.id}
              to={folder.id}
              actions={
                canDelete ? (
                  <Button
                    iconStart="delete"
                    type="danger"
                    outlined
                    onClick={() => askDelete(folder.id)}
                  />
                ) : null
              }
            >
              <div className={styles.row}>
                <span className={styles.label}>Last update:</span>{' '}
                <span className={styles.value}>Today</span>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>Languages:</span>{' '}
                <span className={styles.value}>
                  {folder?.languages?.map(lang => lang.language).join(', ')}
                </span>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>Format:</span>{' '}
                <span className={styles.value}>{folder.format}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>Total Segments:</span>{' '}
                <span className={styles.value}>56</span>
              </div>
            </Card>
          </li>
        ))}
      </ul>

      {dialog.open && (
        <Dialog
          dialog={dialog}
          title="Are you sure?"
          confirmText="Delete"
          confirmType="danger"
          onCancel={clearState}
          onConfirm={handleDelete}
        >
          The folder will be permanently removed!
        </Dialog>
      )}
    </>
  )
}
