import { FC } from 'react'
import { toast } from 'react-hot-toast'
import { useMutation } from '@apollo/client'
import { DELETE_FOLDER } from '@/features/folders/queries'
import { Folder } from '@/features/folders/types'
import styles from './FoldersList.module.scss'
import { Card } from '@/ui/Card/Card'
import { Button } from '@/ui/Button/Button'

type FoldersListType = {
  folders: Folder[]
  canDelete: boolean
  onUpdate: () => void
}

export const FoldersList: FC<FoldersListType> = ({ folders, canDelete, onUpdate }) => {
  console.log('🚀 ~ folders', folders)
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

  if (!folders.length) return <div>You don't have any folders in the project</div>

  return (
    <ul className={styles.list}>
      {folders.map((folder: Folder) => (
        <li className={styles.item} key={folder.id}>
          <Card
            title={folder.name || folder.id}
            actions={
              canDelete ? (
                <Button
                  iconStart="delete"
                  type="danger"
                  outlined
                  onClick={() => handleDelete(folder.id)}
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
  )
}
