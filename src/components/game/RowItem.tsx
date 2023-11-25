import { useStore } from '../../store/zustandStore'

type Props = {
    index: number
    column: number
}

export function RowItem({ index, column } : Props) {
  const word = useStore((state) => state.word)
  const currentRow = useStore((state) => state.currentRow)
  const words = useStore((state) => state.currentWords)
  const winner = useStore((state) => state.win)
  const visible = currentRow > index

  if (visible) {
    const currentLetter = words[index][column]
    const isLetterAndPosition = word[column].toLocaleLowerCase() === currentLetter.toLocaleLowerCase()
    const isLetterNotPosition = word.toLocaleLowerCase().includes(currentLetter.toLocaleLowerCase())
    const classNameItem = isLetterAndPosition ? ' exact' : isLetterNotPosition ? ' found' : ' not-found'
    return <div className={`item${classNameItem}`}>{currentLetter}</div>
  }

  if (currentRow === index) return <div className={`item ${!winner ? 'active' : ''}`}>{words[index][column]}</div>

  return <div className='item'> </div>
}
