import { FC } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useMutation } from '@apollo/client'
import { FolderLanguage, FolderRead } from '@/features/folders/types'
import { UPDATE_FOLDER } from '@/features/folders/queries'

type FolderLangSwitcherType = {
  folder: FolderRead
  currentLanguage: string
}

export const FolderLangSwitcher: FC<FolderLangSwitcherType> = ({ folder, currentLanguage }) => {
  const { lang } = useParams()

  const [updateFolder, { loading: updatingFolder }] = useMutation(UPDATE_FOLDER)

  const changeFolder = async (languages: FolderLanguage[]) => {
    try {
      await updateFolder({
        variables: {
          id: folder.id,
          name: folder.name,
          format: folder.format,
          languages,
        },
      })
      toast.success('Folder updated successfully', { id: 'updateFolder' })
    } catch (error) {
      toast.error('Unable to update project', { id: 'updateFolder' })
    }
  }

  const handleAddLanguage = () => {
    const langName = prompt('Language name')
    if (!langName) return
    changeFolder([
      ...folder.languages,
      {
        language: langName,
        customName: '',
      },
    ])
  }

  const handleDeleteLanguage = (index: number) => {
    const languages = [...folder.languages]
    languages.splice(index, 1)
    changeFolder(languages)
  }

  const changeDefaultLanguage = (index: number) => {
    const languages = [...folder.languages]
    const defaultLang = languages[index]
    languages.splice(index, 1)
    languages.unshift(defaultLang)
    changeFolder(languages)
  }

  return (
    <div>
      <ul>
        {folder.languages.map((language, index) => (
          <li key={language.language}>
            {language.language === currentLanguage ? (
              <span>
                {language.customName || language.language}.{folder.format}
              </span>
            ) : (
              <>
                <NavLink to={`${lang ? '../' : ''}${language.language}`}>
                  {language.customName || language.language}.{folder.format}
                </NavLink>
                {index !== 0 && <button onClick={() => handleDeleteLanguage(index)}>delete</button>}
              </>
            )}
            {index !== 0 && (
              <button onClick={() => changeDefaultLanguage(index)}>make default</button>
            )}
          </li>
        ))}
        <li>
          <button onClick={handleAddLanguage}>add language</button>
        </li>
      </ul>
    </div>
  )
}
