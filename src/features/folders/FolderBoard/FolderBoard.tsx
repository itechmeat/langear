import {
  CSSProperties,
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useSubscription } from '@apollo/client'
import cn from 'classnames'
import { SegmentRead } from '@features/segments/types'
import { AGGREGATE_SEGMENTS_BY_FOLDER_ID } from '@/features/segments/queries'
import { SegmentGridRow, SegmentLangRow } from '@/features/segments/types'
import { SegmentRowItem, SelectedCell } from '@/features/segments/SegmentRowItem/SegmentRowItem'
import { ContentLoader } from '@/ui/ContentLoader/ContentLoader'
import rowStyles from '@/features/segments/SegmentRowItem/SegmentRowItem.module.scss'
import styles from './FolderBoard.module.scss'

const NUM_COLUMN_WIDTH = 50
const DEFAULT_KEY_COLUMN_WIDTH = 50
const MIN_CELL_WIDTH = 20
const MAX_CELL_WIDTH = 1000

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

  const segments = segmentsData?.segments_aggregate?.nodes as SegmentRead[]

  const containerRef = useRef<HTMLInputElement>(null)

  const [selectedCells, setSelectedCells] = useState<SelectedCell | null>(null)
  const [keyColumnWidth, setKeyColumnWidth] = useState<number>(DEFAULT_KEY_COLUMN_WIDTH)

  useLayoutEffect(() => {
    const winWidth = containerRef?.current?.clientWidth || 320
    setKeyColumnWidth(winWidth ? Math.round(winWidth / 3) : DEFAULT_KEY_COLUMN_WIDTH)
  }, [])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if ((event.key === 'Delete' || event.key === 'Backspace') && selectedCells) {
        onDelete(selectedCells.id)
      }
    },
    [selectedCells],
  )

  useEffect(() => {
    if (selectedCells?.target !== 'row') {
      document.removeEventListener('keydown', handleKeyDown)
    } else {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedCells?.target])

  const dataMap: SegmentGridRow[] = useMemo(() => {
    if (!segments) return []
    const result: SegmentGridRow[] = []
    segments.forEach((segment: SegmentRead) => {
      result.push({
        id: segment.id,
        name: segment.name,
        phrase: segment.phrases.find(phrase => phrase.language === currentLanguage),
        type: 'string',
        level: 0,
      })
    })
    return result
  }, [segments])

  const containerStyle = {
    '--grid-num-column-size': `${NUM_COLUMN_WIDTH}px`,
    '--grid-key-column-size': `${keyColumnWidth}px`,
    '--grid-resizer-left': `${NUM_COLUMN_WIDTH + keyColumnWidth - 1}px`,
  } as CSSProperties

  const handleCellClick = (cell: SelectedCell) => {
    setSelectedCells(cell)
  }

  const handleChange = useCallback((row: SegmentLangRow) => {
    // console.log('🚀 row', row)
  }, [])

  return (
    <div className={styles.container} style={containerStyle} ref={containerRef}>
      <div className={styles.head}>
        <div className={cn(rowStyles.row, rowStyles.headRow)}>
          <div className={rowStyles.num}>
            <div className={rowStyles.cell} />
          </div>
          <div className={rowStyles.key}>
            <div className={rowStyles.cell}>Key</div>
          </div>
          <div className={rowStyles.value}>
            <div className={rowStyles.cell}>Text</div>
          </div>
        </div>
      </div>

      <ContentLoader isLoading={segmentsLoading} error={segmentsError}>
        <div className={styles.body}>
          <div className={styles.grid}>
            {dataMap.map(
              (row, index) =>
                row.type !== 'empty' && (
                  <SegmentRowItem
                    data={row}
                    index={index}
                    key={row.id}
                    currentLanguage={currentLanguage}
                    selected={selectedCells?.id === row.id ? selectedCells.target : undefined}
                    onCellClick={handleCellClick}
                    onChange={handleChange}
                    onCreate={onCreate}
                  />
                ),
            )}
          </div>
        </div>
      </ContentLoader>
    </div>
  )
}
