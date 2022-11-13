import { FC } from 'react'
import { FolderRead } from '@/features/folders/types'
import { SegmentItem } from '@/features/segments/SegmentItem/SegmentItem'

type FolderBoardType = {
  folder: FolderRead
  currentLanguage: string
  onCreate: () => void
  onDelete: (id: string) => void
}

export const FolderBoard: FC<FolderBoardType> = ({
  folder,
  currentLanguage,
  onCreate,
  onDelete,
}) => {
  return (
    <div style={{ border: '1px solid #eee', background: '#f1f1f1' }}>
      <div>
        <table>
          <tbody>
            {folder.segments.map(segment => (
              <SegmentItem
                segment={segment}
                currentLanguage={currentLanguage}
                key={segment.id}
                onDelete={() => onDelete(segment.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={onCreate}>add</button>
      </div>
    </div>
  )
}
