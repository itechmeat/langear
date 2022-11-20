import { FC } from 'react'
import styles from './SegmentAddControl.module.scss'

type SegmentAddControlType = {
  onCreate: () => void
}

export const SegmentAddControl: FC<SegmentAddControlType> = ({ onCreate }) => {
  return (
    <button className={styles.add} onClick={onCreate}>
      <span className={styles.label}>Insert new row</span>
    </button>
  )
}
