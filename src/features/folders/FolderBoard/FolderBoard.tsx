import { FC } from 'react'
import { useSubscription } from '@apollo/client'
import { SegmentRead } from '@features/segments/types'
import { AGGREGATE_SEGMENTS_BY_FOLDER_ID } from '@/features/segments/queries'
import { SegmentItem } from '@/features/segments/SegmentItem/SegmentItem'
import styles from './FolderBoard.module.scss'

type FolderBoardType = {
  folderId: string
  currentLanguage: string
  onCreate: () => void
  onDelete: (id: string) => void
}

export const FolderBoard: FC<FolderBoardType> = ({
  folderId,
  currentLanguage,
  onCreate,
  onDelete,
}) => {
  const {
    loading: segmentsLoading,
    data: segmentsData,
    error: segmentsError,
  } = useSubscription(AGGREGATE_SEGMENTS_BY_FOLDER_ID, {
    variables: { id: folderId, language: currentLanguage },
  })
  const segments = segmentsData?.segments_aggregate?.nodes

  return (
    <div style={{ border: '1px solid #eee', background: '#f1f1f1' }}>
      <div>
        {!!segments && (
          <table>
            <tbody>
              {segments.map((segment: SegmentRead) => (
                <SegmentItem
                  segment={segment}
                  currentLanguage={currentLanguage}
                  key={segment.id}
                  onDelete={() => onDelete(segment.id)}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div>
        <button onClick={onCreate}>add</button>
      </div>
    </div>
  )
}
