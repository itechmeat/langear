import { FC, useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { toast } from 'react-hot-toast'
import {
  Form,
  FormError,
  FormField,
  FormInput,
  FormLabel,
  FormSubmit,
  useFormState,
} from 'ariakit/form'
import { ADD_MEMBER, SEARCH_USER } from '@/features/members/queries'
import { MembersRoles } from '@/features/members/types'
import { Select, SelectItem } from '@/ui/Select/Select'
import { User } from '@/features/user/types'

type AddMemberFormType = {
  projectId: string
  onUpdate: () => void
}

export const AddMemberForm: FC<AddMemberFormType> = ({ projectId, onUpdate }) => {
  const [user, setUser] = useState<User | null>(null)
  const [searchUser, { loading, error, data: foundUsers }] = useLazyQuery(SEARCH_USER)

  useEffect(() => {
    if (foundUsers?.users?.length > 0) {
      setUser(foundUsers.users[0])
    }
  }, [foundUsers])

  const [addMember, { loading: addingMember }] = useMutation(ADD_MEMBER)

  const rolesList = Object.values(MembersRoles).filter(
    role => role !== MembersRoles.owner && role !== MembersRoles.admin,
  )

  const userForm = useFormState({
    defaultValues: { email: '' },
  })

  userForm.useSubmit(async () => {
    const { email } = userForm.values
    if (email) {
      await searchUser({
        variables: { email },
      })
    }

    try {
      await searchUser()
    } catch (error) {
      console.error('🚀 error', error)
    }
  })

  const memberForm = useFormState({
    defaultValues: { role: MembersRoles.reader },
  })

  memberForm.useSubmit(async () => {
    const { role } = memberForm.values

    try {
      await addMember({
        variables: {
          projectId,
          userId: user?.id,
          role,
        },
      })
      onUpdate()
      toast.success('Member added successfully', { id: 'addUser' })
    } catch (error) {
      toast.error('Unable to add member', { id: 'addUser' })
    }
  })

  const disableForm = addingMember

  return (
    <div>
      <h3>Add new member to the project</h3>

      {!user && (
        <Form state={userForm} aria-labelledby="search-member-form" className="wrapper">
          <div className="field">
            <FormLabel name={userForm.names.email}>Email</FormLabel>
            <FormInput name={userForm.names.email} placeholder="email" required />
            <FormError name={userForm.names.email} className="error" />
          </div>
          <div className="buttons">
            <FormSubmit className="button" disabled={disableForm}>
              Search
            </FormSubmit>
          </div>
        </Form>
      )}

      {!!user && (
        <>
          <div>
            <button onClick={() => setUser(null)}>clear</button>
          </div>
          <div>
            <div>
              {user.displayName} ({user.email})
            </div>

            <Form state={memberForm} aria-labelledby="add-member-form" className="wrapper">
              <div className="field">
                <FormLabel name={memberForm.names.role}>Role</FormLabel>
                <FormField
                  as={Select}
                  name={memberForm.names.role}
                  value={memberForm.values.role}
                  touchOnBlur={false}
                  setValue={(value: string) => memberForm.setValue(memberForm.names.role, value)}
                  onTouch={() => memberForm.setFieldTouched(memberForm.names.role, true)}
                >
                  {rolesList.map((role, index) => (
                    <SelectItem className="select-item" value={role} key={index}>
                      {role}
                    </SelectItem>
                  ))}
                </FormField>
                <FormError name={memberForm.names.role} className="error" />
              </div>
              <div className="buttons">
                <FormSubmit className="button" disabled={disableForm}>
                  {addingMember ? <span>LOADING...</span> : 'Submit'}
                </FormSubmit>
              </div>
            </Form>
          </div>
        </>
      )}
    </div>
  )
}
