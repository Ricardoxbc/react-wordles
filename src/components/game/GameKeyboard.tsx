import DeleteIcon from '../DeleteIcon'
import { useStore } from '../../store/zustandStore'

export function GameKeyboard() {
  const nextRow = useStore((state) => state.nextRow)
  const prevLetter = useStore((state) => state.prevLetter)
  const nextWord = useStore((state) => state.nextWord)
  const letters = useStore((state) => state.letters)

  const keys = []
  for (let i = 65; i <= 90; i++) {
    keys.push(String.fromCharCode(i))
  }
  return (
    <div className='keyboard'>
      {keys.map((key, i) => {
        const foundIndex = letters.findIndex((l) => l.key === key)
        const found = letters[foundIndex]?.foundAndExact
        const className = foundIndex >= 0 ? (found ? 'exact' : found !== undefined ? 'found' : 'not-found') : ''
        return (
          <button key={`button_key_${key}_${i}`} className={className} onClick={() => nextWord(key)}>
            {key}
          </button>
        )
      })}
      <button className='delete' onClick={() => prevLetter()}>
        <DeleteIcon />
      </button>
      <button className='next' onClick={() => nextRow()}>
        Enviar
      </button>
    </div>
  )
}
