import { ComponentProps, FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import { Dialog as AriaDialog, DialogHeading } from 'ariakit/dialog'
import { DisclosureState } from 'ariakit'
import { Button } from '@/ui/Button/Button'
import styles from './Dialog.module.scss'

type DialogProps = {
  dialog: DisclosureState
  title: string
  cancelText?: string
  confirmText?: string
  confirmType?: ComponentProps<typeof Button>['type']
  onCancel?: () => void
  onConfirm?: () => void
}

export const Dialog: FC<PropsWithChildren<DialogProps>> = ({
  dialog,
  title,
  cancelText = 'Cancel',
  confirmText,
  confirmType = 'brand',
  children,
  onCancel,
  onConfirm,
}) => {
  return (
    <div>
      <AriaDialog state={dialog} modal={dialog.mounted} hidden={false} className={styles.dialog}>
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
        </header>
        {children}
        <footer className={styles.footer}>
          {onCancel && (
            <Button type="default" outlined data-dialog-dismiss onClick={onCancel}>
              {cancelText}
            </Button>
          )}
          {confirmText && onConfirm && (
            <Button type={confirmType} onClick={onConfirm}>
              {confirmText}
            </Button>
          )}
        </footer>
      </AriaDialog>
    </div>
  )
}
