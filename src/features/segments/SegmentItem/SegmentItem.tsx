import { FC, useMemo } from 'react'
import { useUserId } from '@nhost/react'
import { useMutation } from '@apollo/client'
import { toast } from 'react-hot-toast'
import { SegmentRead } from '@/features/segments/types'
import { UPDATE_SEGMENT } from '@/features/segments/queries'
import { CREATE_PHRASE, UPDATE_PHRASE } from '@/features/phrases/queries'

type SegmentItemType = {
  segment: SegmentRead
  currentLanguage: string
  onDelete: () => void
}

export const SegmentItem: FC<SegmentItemType> = ({ segment, currentLanguage, onDelete }) => {
  const userId = useUserId()
  const [createPhrase, { loading: creatingPhrase }] = useMutation(CREATE_PHRASE)
  const [updatePhrase, { loading: updatingPhrase }] = useMutation(UPDATE_PHRASE)
  const [updateSegment, { loading: updatingSegment }] = useMutation(UPDATE_SEGMENT)

  const phrase = useMemo(() => {
    return segment.phrases.find(phrase => phrase.language === currentLanguage)
  }, [segment])

  const handleCreatePhrase = async (event: any) => {
    const value = event.target.value
    try {
      await createPhrase({
        variables: {
          value,
          segmentId: segment.id,
          lastUserId: userId,
          language: currentLanguage,
        },
      })
      toast.success('Phrase added successfully', { id: 'addPhrase' })
    } catch (error) {
      toast.error('Unable to add phrase', { id: 'addPhrase' })
    }
  }

  const handleUpdatePhrase = async (event: any) => {
    if (!phrase?.id) return
    const value = event.target.value
    try {
      await updatePhrase({
        variables: {
          id: phrase.id,
          value,
          lastUserId: userId,
        },
      })
      toast.success('Phrase added successfully', { id: 'updatePhrase' })
    } catch (error) {
      toast.error('Unable to add phrase', { id: 'updatePhrase' })
    }
  }

  const handleUpdateSegment = async (event: any) => {
    const value = event.target.value
    try {
      await updateSegment({
        variables: {
          id: segment.id,
          name: value,
          lastUserId: userId,
        },
      })
      toast.success('Phrase added successfully', { id: 'updateSegment' })
    } catch (error) {
      toast.error('Unable to add phrase', { id: 'updateSegment' })
    }
  }

  return (
    <tr key={segment.id}>
      <td key={segment.name}>
        Segment:
        <input defaultValue={segment.name} onBlur={handleUpdateSegment} />
      </td>
      <td key={phrase?.value || 0}>
        Phrase:
        {!phrase ? (
          <input defaultValue="" onBlur={handleCreatePhrase} />
        ) : (
          <input defaultValue={phrase.value} onBlur={handleUpdatePhrase} />
        )}
      </td>
      <td>
        <button onClick={onDelete}>delete</button>
      </td>
    </tr>
  )
}
