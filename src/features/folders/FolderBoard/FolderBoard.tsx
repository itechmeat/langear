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
import cn from 'classnames'
import { MappedSegment, SegmentRead, SegmentReadMapped } from '@features/segments/types'
import { SegmentGridRow, SegmentLangRow } from '@/features/segments/types'
import { SegmentRowItem, SelectedCell } from '@/features/segments/SegmentRowItem/SegmentRowItem'
import { ContentLoader } from '@/ui/ContentLoader/ContentLoader'
import rowStyles from '@/features/segments/SegmentRowItem/SegmentRowItem.module.scss'
import styles from './FolderBoard.module.scss'
import { PhraseRead } from '@features/phrases/types'

const NUM_COLUMN_WIDTH = 50
const DEFAULT_KEY_COLUMN_WIDTH = 50
const MIN_CELL_WIDTH = 20
const MAX_CELL_WIDTH = 1000

type FolderBoardType = {
  segments: SegmentRead[]
  order: string[]
  isLoading?: boolean
  errorMessage?: string
  currentLanguage: string
  onCreate: () => void
  onDelete: (id: string) => void
}

export const FolderBoard: FC<FolderBoardType> = ({
  segments,
  order,
  isLoading,
  errorMessage,
  currentLanguage,
  onCreate,
  onDelete,
}) => {
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

  const segmentsStructure = useMemo((): { segments: MappedSegment } | null => {
    if (!segments) return null
    const items = new Map<string, SegmentReadMapped>(
      segments.map((segment: SegmentRead) => {
        const phrases = new Map<string, PhraseRead>(
          segment.phrases.map((phrase: PhraseRead) => [phrase.language, phrase]),
        )
        return [segment.id, { ...segment, phrases }]
      }),
    )
    return { segments: items }
  }, [segments])

  const dataMap: SegmentGridRow[] = useMemo(() => {
    if (!segments) return []

    return segments.map(segment => ({
      id: segment.id,
      name: segment.name,
      phrase: segment.phrases.find(phrase => phrase.language === currentLanguage),
      type: 'string',
      level: 0,
    }))
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

      <ContentLoader isLoading={isLoading} errorMessage={errorMessage}>
        {dataMap.length > 0 ? (
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
        ) : (
          <div className={styles.empty}>
            <button onClick={onCreate}>Add first segment</button>
          </div>
        )}
      </ContentLoader>
    </div>
  )
}
