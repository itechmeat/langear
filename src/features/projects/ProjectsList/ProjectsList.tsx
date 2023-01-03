import { ComponentProps, FC } from 'react'
import { NavLink } from 'react-router-dom'
import { Project } from '@/features/projects/types'
import { AvatarsList } from '@/ui/AvatarsList/AvatarsList'
import { Card } from '@/ui/Card/Card'
import styles from './ProjectsList.module.scss'

type ProjectsListType = {
  list: Project[]
}

export const ProjectsList: FC<ProjectsListType> = ({ list }) => {
  const getAvatars = (project: Project): ComponentProps<typeof AvatarsList>['items'] => {
    const result = [
      {
        id: project.user.id,
        name: project.user.displayName,
        legend: 'Owner',
      },
    ]
    if (project.members.length > 0) {
      project.members.forEach(member => {
        if (result.some(item => item.id === member.user.id)) return
        result.push({
          id: member.user.id,
          name: member.user.displayName,
          legend: member.role,
        })
      })
    }
    return result
  }

  if (!list.length) return <div>You don't have any projects</div>

  return (
    <ul className={styles.list}>
      {list.map((project: Project) => (
        <li className={styles.item} key={project.id}>
          <Card
            title={project.name}
            to={project.id}
            footer={
              <div className={styles.users}>
                <AvatarsList items={getAvatars(project)} size={32} />
              </div>
            }
          >
            <div className={styles.row}>
              <span className={styles.label}>Last update:</span>{' '}
              <span className={styles.value}>Today</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Folders:</span>{' '}
              <span className={styles.value}>
                {project.folders.length > 0 ? (
                  project.folders.map((folder, index) => (
                    <span key={index}>
                      {index > 0 && <span>, </span>}
                      <NavLink to={`${project.id}/${folder.id}`} className={styles.folder}>
                        {folder.name}
                      </NavLink>{' '}
                      <span>({folder?.segmentsAggregate?.aggregate?.count})</span>
                    </span>
                  ))
                ) : (
                  <span>---</span>
                )}
              </span>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  )
}
