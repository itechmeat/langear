import { FC } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import cn from 'classnames'
import { toast } from 'react-hot-toast'
import { useMutation } from '@apollo/client'
import { FolderLanguage, FolderRead } from '@/features/folders/types'
import { UPDATE_FOLDER } from '@/features/folders/queries'
import styles from './FolderLangSwitcher.module.scss'

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
    <div className={styles.switcher}>
      <ul className={styles.tabs}>
        <li className={cn(styles.new)}>
          <button onClick={handleAddLanguage}>+</button>
        </li>
        {folder.languages.map((language, index) => (
          <li className={cn(styles.tab, styles.main)} key={language.language}>
            <div
              className={cn(styles.control, {
                [styles.active]: language.language === currentLanguage,
              })}
            >
              {language.language === currentLanguage ? (
                <span className={styles.label}>
                  {language.customName || language.language}.{folder.format}
                </span>
              ) : (
                <>
                  <NavLink to={`${lang ? '../' : ''}${language.language}`} className={styles.label}>
                    {language.customName || language.language}.{folder.format}
                  </NavLink>
                  {index !== 0 && (
                    <button className={styles.delete} onClick={() => handleDeleteLanguage(index)}>
                      x
                    </button>
                  )}
                </>
              )}
              {index !== 0 && (
                <button className={styles.move} onClick={() => changeDefaultLanguage(index)}>
                  ^
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
