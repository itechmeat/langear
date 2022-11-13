import { ChangeEvent, FC, useMemo } from 'react'
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

  const handleChangePhrase = async (event: ChangeEvent<HTMLInputElement>) => {
    const phraseId = phrase?.id
    const value = event.target.value
    try {
      if (!phraseId) {
        await createPhrase({
          variables: {
            value,
            segmentId: segment.id,
            lastUserId: userId,
            language: currentLanguage,
          },
        })
        return
      }
      await updatePhrase({
        variables: {
          id: phrase.id,
          value,
          lastUserId: userId,
        },
      })
    } catch (error) {
      toast.error('Unable to change phrase', { id: 'changePhrase' })
    }
  }

  const handleUpdateSegment = async (event: ChangeEvent<HTMLInputElement>) => {
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
        <input defaultValue={!phrase ? '' : phrase.value} onBlur={handleChangePhrase} />
      </td>
      <td>
        <button onClick={onDelete}>delete</button>
      </td>
    </tr>
  )
}
