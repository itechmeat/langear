import { FC } from 'react'
import { useMutation } from '@apollo/client'
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
import { CREATE_FOLDER } from '@/features/folders/queries'
import { Select, SelectItem } from '@/ui/Select/Select'
import { Format, formatList, langList, Language } from '@/features/types'
import { Button } from '@/ui/Button/Button'
import styles from './AddFolderForm.module.scss'

type AddFolderFormType = {
  projectId: string
  suggestedName?: string
  onSubmit: () => void
  onCancel: () => void
}

export const AddFolderForm: FC<AddFolderFormType> = ({
  projectId,
  suggestedName = '',
  onSubmit,
  onCancel,
}) => {
  const [createFolder, { loading: creatingFolder }] = useMutation(CREATE_FOLDER)

  const folderForm = useFormState({
    defaultValues: { name: suggestedName, language: Language.en, format: Format.json },
  })

  folderForm.useSubmit(async () => {
    const { name, language, format } = folderForm.values

    try {
      await createFolder({
        variables: {
          name,
          projectId,
          format,
          languages: [
            {
              language,
              customName: '',
            },
          ],
        },
      })
      onSubmit()
      toast.success('Folder added successfully', { id: 'addFolder' })
    } catch (error) {
      toast.error('Unable to add folder', { id: 'addFolder' })
    }
  })

  const disableForm = creatingFolder

  return (
    <Form state={folderForm} aria-labelledby="add-folder-form" className="wrapper">
      <div className="field">
        <FormLabel name={folderForm.names.name}>Name</FormLabel>
        <FormInput name={folderForm.names.name} placeholder="email" required />
        <FormError name={folderForm.names.name} className="error" />
      </div>

      <div className="field">
        <FormLabel name={folderForm.names.language}>Default Language</FormLabel>
        <FormField
          as={Select}
          name={folderForm.names.language}
          value={folderForm.values.language}
          touchOnBlur={false}
          setValue={(value: string) => folderForm.setValue(folderForm.names.language, value)}
          onTouch={() => folderForm.setFieldTouched(folderForm.names.language, true)}
        >
          {langList.map((language, index) => (
            <SelectItem className="select-item" value={language.key} key={index}>
              {language.value}
            </SelectItem>
          ))}
        </FormField>
        <FormError name={folderForm.names.language} className="error" />
      </div>

      <div className="field">
        <FormLabel name={folderForm.names.format}>Format</FormLabel>
        <FormField
          as={Select}
          name={folderForm.names.format}
          value={folderForm.values.format}
          touchOnBlur={false}
          setValue={(value: string) => folderForm.setValue(folderForm.names.format, value)}
          onTouch={() => folderForm.setFieldTouched(folderForm.names.format, true)}
        >
          {formatList.map((format, index) => (
            <SelectItem className="select-item" value={format.key} key={index}>
              {format.value}
            </SelectItem>
          ))}
        </FormField>
        <FormError name={folderForm.names.format} className="error" />
      </div>

      <footer className={styles.footer}>
        <Button type="default" outlined data-dialog-dismiss onClick={onCancel}>
          Cancel
        </Button>
        <Button type="success" disabled={disableForm} onClick={folderForm.submit}>
          {creatingFolder ? <span>LOADING...</span> : 'Submit'}
        </Button>
      </footer>
    </Form>
  )
}
