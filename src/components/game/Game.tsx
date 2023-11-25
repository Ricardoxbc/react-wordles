import { useEffect } from 'react'
import { ROW_LIMIT, useStore } from '../../store/zustandStore'
import confetti from 'canvas-confetti'
import { GameKeyboard } from './GameKeyboard'
import { GameRow } from './GameRow'

import victoryIcon from '../../assets/victory.png'

import './Game.css'
import { RefreshIcon } from '../RefreshIcon'

export function Game() {
  const winState = useStore((state) => state.win)
  const reset = useStore((state) => state.reset)
  useEffect(() => {
    if (winState === undefined) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
    if (winState !== undefined) {
      window.scrollTo({
        top: 1000,
        left: 0,
        behavior: 'smooth'
      })
    }
    if (winState) {
      confetti({
        particleCount: 100
      })
    }
  }, [winState])
  return (
    <main>
      <section className='board'>
        {Array(ROW_LIMIT)
          .fill(null)
          .map((_el, i) => (
            <GameRow key={`gamerow_${i}`} row={i} />
          ))}
      </section>
      <section className='letters'>
        <GameKeyboard />
      </section>
      <section className='info'>
        {winState !== undefined ? (
          winState ? (
            <div className='winner'>
              <h2>Victoria !</h2>
              <img src={victoryIcon} style={{ width: 50, height: 'auto' }} />
            </div>
          ) : (
            <>
              <h2>Mejor suerte la próxima vez</h2>
              <GameRow row={ROW_LIMIT} completed={true} />
              <button onClick={() => reset()} style={{ width: 32, height: 32, border: 'none', cursor: 'pointer' }}>
                <RefreshIcon />
              </button>
            </>
          )
        ) : null}
      </section>
    </main>
  )
}
