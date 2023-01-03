import { FC, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useMutation } from '@apollo/client'
import { useDialogState } from 'ariakit/dialog'
import { DELETE_MEMBER } from '@/features/members/queries'
import { Member, MembersRoles } from '@/features/members/types'
import { UsersList } from '@/ui/UsersList/UsersList'
import { Dialog } from '@/ui/Dialog/Dialog'

type MembersListType = {
  members: Member[]
  canDelete: boolean
  onUpdate: () => void
}

export const MembersList: FC<MembersListType> = ({ members, canDelete, onUpdate }) => {
  const [deleteMember, { loading: deletingMember }] = useMutation(DELETE_MEMBER)

  const dialog = useDialogState()

  const [deletedMemberId, setDeletedMemberId] = useState('')

  const clearState = () => {
    setDeletedMemberId('')
    dialog.hide()
  }

  const askDelete = (folderId: string) => {
    setDeletedMemberId(folderId)
    dialog.show()
  }

  const handleDelete = async () => {
    try {
      await deleteMember({
        variables: {
          id: deletedMemberId,
        },
      })
      onUpdate()
      toast.success('Deleted successfully', { id: 'deleteMember' })
    } catch (error) {
      toast.error('Unable to delete member', { id: 'deleteMember' })
    }
    clearState()
  }

  return (
    <>
      {members.length ? (
        <UsersList users={members} canDelete={canDelete} onDelete={id => askDelete(id)} />
      ) : (
        <div>You're alone in the project :(</div>
      )}

      {dialog.open && (
        <Dialog
          dialog={dialog}
          title="Are you sure?"
          cancelText="Cancel"
          confirmText="Delete"
          confirmType="danger"
          onCancel={clearState}
          onConfirm={handleDelete}
        >
          The member will be removed, but you can add them as a new user later.
        </Dialog>
      )}
    </>
  )
}
