import { useStore } from '../../store/zustandStore'
import { RowItem } from './RowItem'

type Props = {
  row: number
  completed?: boolean
}

export function GameRow({ row, completed }: Props) {
  const word = useStore((state) => state.word)
  const wordArr = word.split('')

  if (completed)
    return (
      <div className='game-row' style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'center', margin: '1em auto' }}>
        {wordArr.map((w, i) => (
          <div key={`row_item_answer_${w}_${i}`} className='item exact'>
            {w}
          </div>
        ))}
      </div>
    )

  return (
    <div className='game-row'>
      {wordArr.map((ltr, column) => {
        const id = `game_row_${ltr}_${row}_${column}`
        return <RowItem key={id} index={row} column={column} />
      })}
    </div>
  )
}
