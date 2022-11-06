import { FC } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'
import { useAuthenticated } from '@nhost/react'
import { toast } from 'react-hot-toast'
import { Form, FormError, FormInput, FormLabel, FormSubmit, useFormState } from 'ariakit/form'

const CREATE_PROJECT = gql`
  mutation CreateProject($name: String!, $description: String) {
    insert_projects_one(object: { name: $name, description: $description }) {
      id
      name
      description
    }
  }
`

type ProjectsCreatePageType = {}

export const ProjectsCreatePage: FC<ProjectsCreatePageType> = () => {
  const navigate = useNavigate()
  const isAuthenticated = useAuthenticated()
  const [createProject, { loading: creatingProject }] = useMutation(CREATE_PROJECT)

  const form = useFormState({
    defaultValues: { name: '', description: '' },
  })

  form.useSubmit(async () => {
    if (!isAuthenticated) return
    const { name, description } = form.values

    try {
      const { data } = await createProject({
        variables: {
          name: name.trim(),
          description: description.trim(),
        },
      })
      toast.success('Updated successfully', { id: 'createProject' })
      const id = data?.insert_projects_one?.id
      if (id) {
        navigate(`../${id}`)
      }
    } catch (error) {
      toast.error('Unable to create Project', { id: 'createProject' })
    }
  })

  const disableForm = creatingProject

  return (
    <div>
      <h1>Create new project</h1>

      <Form state={form} aria-labelledby="sign-in-form" className="wrapper">
        <div className="field">
          <FormLabel name={form.names.name}>Name</FormLabel>
          <FormInput name={form.names.name} required placeholder="name" />
          <FormError name={form.names.name} className="error" />
        </div>
        <div className="field">
          <FormLabel name={form.names.description}>Description</FormLabel>
          <FormInput name={form.names.description} placeholder="description" />
          <FormError name={form.names.description} className="error" />
        </div>
        <div className="buttons">
          <FormSubmit className="button" disabled={disableForm}>
            {creatingProject ? <span>LOADING...</span> : 'Create'}
          </FormSubmit>
        </div>
      </Form>

      <p>
        <NavLink to="..">Back to projects list</NavLink>
      </p>
    </div>
  )
}
