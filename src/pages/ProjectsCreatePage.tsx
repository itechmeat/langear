import { FC } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { useAuthenticated } from '@nhost/react'
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
import { Select, SelectItem } from '@/ui/Select/Select'
import { Format, formatList, langList, Language } from '@/features/types'
import { CREATE_PROJECT } from '@/features/projects/queries'
import { ADD_MEMBER } from '@/features/members/queries'
import { CREATE_FOLDER } from '@/features/folders/queries'
import { MembersRoles } from '@/features/members/types'

type ProjectsCreatePageType = {}

export const ProjectsCreatePage: FC<ProjectsCreatePageType> = () => {
  const navigate = useNavigate()
  const isAuthenticated = useAuthenticated()
  const [createProject, { loading: creatingProject }] = useMutation(CREATE_PROJECT)
  const [addMember, { loading: addingMember }] = useMutation(ADD_MEMBER)
  const [createFolder, { loading: creatingFolder }] = useMutation(CREATE_FOLDER)

  const form = useFormState({
    defaultValues: { name: '', description: '', language: Language.en, format: Format.json },
  })

  form.useSubmit(async () => {
    if (!isAuthenticated) return
    const { name, description, language, format } = form.values

    try {
      const { data: newProject } = await createProject({
        variables: {
          name: name.trim(),
          description: description.trim(),
        },
      })
      toast.success('Project created successfully', { id: 'createProject' })
      const projectId = newProject?.insert_projects_one?.id
      await addMember({
        variables: {
          projectId,
          userId: newProject?.insert_projects_one?.ownerId,
          role: MembersRoles.owner,
        },
      })
      await createFolder({
        variables: {
          name: `Default folder of the ${newProject?.insert_projects_one?.name} project`,
          projectId: projectId,
          language,
          format,
        },
      })
      if (projectId) {
        navigate(`../${projectId}/edit`)
      }
    } catch (error) {
      toast.error('Unable to create Project', { id: 'createProjectUnable' })
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

        <div className="field">
          <FormLabel name={form.names.language}>Language</FormLabel>
          <FormField
            as={Select}
            name={form.names.language}
            value={form.values.language}
            touchOnBlur={false}
            setValue={(value: string) => form.setValue(form.names.language, value)}
            onTouch={() => form.setFieldTouched(form.names.language, true)}
          >
            {langList.map((language, index) => (
              <SelectItem className="select-item" value={language.key} key={index}>
                {language.value}
              </SelectItem>
            ))}
          </FormField>
          <FormError name={form.names.language} className="error" />
        </div>

        <div className="field">
          <FormLabel name={form.names.format}>Format</FormLabel>
          <FormField
            as={Select}
            name={form.names.format}
            value={form.values.format}
            touchOnBlur={false}
            setValue={(value: string) => form.setValue(form.names.format, value)}
            onTouch={() => form.setFieldTouched(form.names.format, true)}
          >
            {formatList.map((format, index) => (
              <SelectItem className="select-item" value={format.key} key={index}>
                {format.value}
              </SelectItem>
            ))}
          </FormField>
          <FormError name={form.names.format} className="error" />
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
