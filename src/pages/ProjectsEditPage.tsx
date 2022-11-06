import { FC, useEffect } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useAuthenticated } from '@nhost/react'
import { toast } from 'react-hot-toast'
import { Form, FormError, FormInput, FormLabel, FormSubmit, useFormState } from 'ariakit/form'

const GET_PROJECT = gql`
  query ProjectById($id: uuid!) {
    projects_by_pk(id: $id) {
      id
      name
      description
    }
  }
`

const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: uuid!, $name: String, $description: String) {
    update_projects_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name, description: $description }
    ) {
      id
      name
      description
    }
  }
`

type ProjectsEditPageType = {}

export const ProjectsEditPage: FC<ProjectsEditPageType> = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isAuthenticated = useAuthenticated()
  const { loading, data, error } = useQuery(GET_PROJECT, {
    variables: { id },
  })
  const [updateProject, { loading: updatingProject }] = useMutation(UPDATE_PROJECT)

  const form = useFormState({
    defaultValues: { name: '', description: '' },
  })

  useEffect(() => {
    if (!form.values.name && data?.projects_by_pk?.name) {
      form.setValue('name', data.projects_by_pk.name)
    }
    if (!form.values.description && data?.projects_by_pk?.description) {
      form.setValue('description', data.projects_by_pk.description)
    }
  }, [data])

  form.useSubmit(async () => {
    if (!isAuthenticated) return
    const { name, description } = form.values

    try {
      await updateProject({
        variables: {
          id,
          name: name ? name.trim() : data?.projects_by_pk?.name || '',
          description: description ? description.trim() : data?.projects_by_pk?.description || '',
        },
      })
      toast.success('Updated successfully', { id: 'updateProject' })
      navigate(`..`)
    } catch (error) {
      toast.error('Unable to update project', { id: 'updateProject' })
    }
  })

  const disableForm = updatingProject

  if (loading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <div>You must be authenticated to see this page</div>
  }

  if (error) {
    return <div>Error in the query {error.message}</div>
  }

  return (
    <div>
      <h1>{data.projects_by_pk.name}</h1>

      <p>{data.projects_by_pk.description}</p>

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
        <div className="buttons">
          <FormSubmit className="button" disabled={disableForm}>
            {updatingProject ? <span>LOADING...</span> : 'Update'}
          </FormSubmit>
        </div>
      </Form>

      <p>
        <NavLink to="..">Back to project</NavLink>
      </p>
    </div>
  )
}
