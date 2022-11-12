import { FC } from 'react'
import { toast } from 'react-hot-toast'
import { useMutation } from '@apollo/client'
import { DELETE_MEMBER } from '@/features/members/queries'
import { Member, MembersRoles } from '@/features/members/types'

type MembersListType = {
  members: Member[]
  canDelete: boolean
  onUpdate: () => void
}

export const MembersList: FC<MembersListType> = ({ members, canDelete, onUpdate }) => {
  const [deleteMember, { loading: deletingMember }] = useMutation(DELETE_MEMBER)

  const handleDelete = async (memberId: string) => {
    try {
      await deleteMember({
        variables: {
          id: memberId,
        },
      })
      onUpdate()
      toast.success('Deleted successfully', { id: 'deleteMember' })
    } catch (error) {
      toast.error('Unable to delete member', { id: 'deleteMember' })
    }
  }

  return (
    <div>
      <h2>Members</h2>

      {members.length ? (
        <ul>
          {members.map((member: Member) => (
            <li key={member.id}>
              {member.user?.displayName || member.id} ({member.role})
              {canDelete && member.role !== MembersRoles.owner && (
                <button onClick={() => handleDelete(member.id)}>delete</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div>You're alone in the project :(</div>
      )}
    </div>
  )
}
