import { FC, useCallback, FocusEvent } from 'react'
import cn from 'classnames'
import { toast } from 'react-hot-toast'
import { useUserId } from '@nhost/react'
import { useMutation } from '@apollo/client'
import { SegmentGridRow } from '@/features/segments/types'
import { CREATE_PHRASE, UPDATE_PHRASE } from '@/features/phrases/queries'
import { UPDATE_SEGMENT } from '@/features/segments/queries'
import { SegmentAddControl } from '@/features/segments/SegmentAddControl/SegmentAddControl'
import styles from './SegmentRowItem.module.scss'

export enum TargetCell {
  row = 'row',
  key = 'key',
  value = 'value',
}

export type SelectedCell = {
  id: string
  target: `${TargetCell}`
}

type SegmentRowItemType = {
  data: SegmentGridRow
  index: number
  currentLanguage: string
  selected?: `${TargetCell}`
  onCellClick: (cell: SelectedCell) => void
  onChange: (cell: SegmentGridRow) => void
  onCreate: () => void
}

export const SegmentRowItem: FC<SegmentRowItemType> = ({
  data,
  index,
  selected,
  currentLanguage,
  onCellClick,
  onCreate,
}) => {
  const userId = useUserId()
  const [createPhrase, { loading: creatingPhrase }] = useMutation(CREATE_PHRASE)
  const [updatePhrase, { loading: updatingPhrase }] = useMutation(UPDATE_PHRASE)
  const [updateSegment, { loading: updatingSegment }] = useMutation(UPDATE_SEGMENT)

  const handleUpdateSegment = async (event: FocusEvent<HTMLDivElement>) => {
    const value = event.target.innerText
    if (value === data.name) return
    try {
      await updateSegment({
        variables: {
          id: data.id,
          name: value,
          lastUserId: userId,
        },
      })
      toast.success('Phrase added successfully', { id: 'updateSegment' })
    } catch (error) {
      toast.error('Unable to add phrase', { id: 'updateSegment' })
    }
  }

  const handleChangePhrase = async (event: FocusEvent<HTMLDivElement>) => {
    const value = event.target.innerText
    if (value === data.phrase?.value) return
    try {
      if (!data.phrase?.id) {
        await createPhrase({
          variables: {
            value,
            segmentId: data.id,
            lastUserId: userId,
            language: currentLanguage,
          },
        })
        return
      }
      await updatePhrase({
        variables: {
          id: data.phrase.id,
          value,
          lastUserId: userId,
        },
      })
    } catch (error) {
      toast.error('Unable to change phrase', { id: 'changePhrase' })
    }
  }

  const handleClick = useCallback((target: `${TargetCell}`) => {
    onCellClick({ id: data.id, target })
  }, [])

  return (
    <div
      className={cn(
        styles.row,
        { [styles.section]: data.type === 'section' },
        { [styles.selectedRow]: selected === TargetCell.row },
      )}
    >
      <div
        className={cn(styles.num, { [styles.active]: selected })}
        onClick={() => handleClick(TargetCell.row)}
      >
        <div className={cn(styles.cell)}>{index + 1}</div>
        <SegmentAddControl onCreate={onCreate} />
      </div>

      <div
        className={cn(styles.key, {
          [styles.sectionName]: data.type === 'section',
        })}
        onClick={() => handleClick(TargetCell.key)}
      >
        <div
          className={cn(styles.cell, {
            [styles.selected]: selected === TargetCell.key,
          })}
          style={{ paddingLeft: data.level * 12 + 2 + 'px' }}
          suppressContentEditableWarning={selected === TargetCell.key}
          contentEditable={selected === TargetCell.key}
          onBlur={event => handleUpdateSegment(event)}
        >
          {data.name}
        </div>
      </div>

      {data.type !== 'section' && (
        <div className={styles.value} onClick={() => handleClick(TargetCell.value)}>
          <div
            className={cn(styles.cell, {
              [styles.selected]: selected === TargetCell.value,
            })}
            suppressContentEditableWarning={selected === TargetCell.value}
            contentEditable={selected === TargetCell.value}
            onBlur={event => handleChangePhrase(event)}
          >
            {data.phrase?.value}
          </div>
        </div>
      )}
    </div>
  )
}
