import { FC, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { Form, FormError, FormInput, FormLabel, FormSubmit, useFormState } from 'ariakit/form'
import { useAuthenticated } from '@nhost/react'
import { useMutation } from '@apollo/client'
import { UPDATE_PROJECT } from '@/features/projects/queries'
import { Project } from '@/features/projects/types'
import { Button } from '@/ui/Button/Button'
import styles from './EditProjectForm.module.scss'

type EditProjectFormType = {
  project: Project
  onSave: () => void
  onCancel: () => void
}

export const EditProjectForm: FC<EditProjectFormType> = ({ project, onSave, onCancel }) => {
  const isAuthenticated = useAuthenticated()
  const [updateProject, { loading: updatingProject }] = useMutation(UPDATE_PROJECT)

  const form = useFormState({
    defaultValues: { name: '', description: '' },
  })

  useEffect(() => {
    if (!project) return
    if (!form.values.name && project.name) {
      form.setValue('name', project.name)
    }
    if (!form.values.description && project.description) {
      form.setValue('description', project.description)
    }
  }, [project])

  form.useSubmit(async () => {
    if (!isAuthenticated) return
    const { name, description } = form.values

    try {
      await updateProject({
        variables: {
          id: project.id,
          name: name ? name.trim() : project?.name || '',
          description: description ? description.trim() : project?.description || '',
        },
      })
      toast.success('Updated successfully', { id: 'updateProject' })
      onSave()
    } catch (error) {
      toast.error('Unable to update project', { id: 'updateProject' })
    }
  })

  const disableForm = updatingProject
  return (
    <Form state={form} aria-labelledby="edit-project-form" className="wrapper">
      <div className="field">
        <FormLabel name={form.names.name}>Name</FormLabel>
        <FormInput name={form.names.name} placeholder="name" />
        <FormError name={form.names.name} className="error" />
      </div>
      <div className="field">
        <FormLabel name={form.names.description}>Description</FormLabel>
        <FormInput name={form.names.description} placeholder="description" />
        <FormError name={form.names.description} className="error" />
      </div>

      <footer className={styles.footer}>
        <Button type="default" outlined data-dialog-dismiss onClick={onCancel}>
          Cancel
        </Button>
        <Button type="success" disabled={disableForm} onClick={form.submit}>
          {updatingProject ? <span>LOADING...</span> : 'Save'}
        </Button>
      </footer>
    </Form>
  )
}
