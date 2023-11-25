import { create } from 'zustand'
import { DEFAULT_WORDS } from './defaultWords'

export const ROW_LIMIT = 6

type LettersT = { key: string; foundAndExact?: boolean }

type StoreT = {
  word: string
  currentRow: number
  currentWords: Array<string[]>
  letters: LettersT[]
  win?: boolean

  nextRow: () => void
  init: () => void
  nextWord: (s: string) => void
  prevLetter: () => void
  reset: () => void
}

const initState = {
  word: DEFAULT_WORDS[Math.floor(Math.random() * DEFAULT_WORDS.length)],
  currentRow: 0,
  currentWords: [[]],
  letters: [],
  win: undefined
}

export const useStore = create<StoreT>((set, get) => ({
  word: initState.word,
  currentRow: 0,
  currentWords: [[]],
  letters: [],
  win: undefined,

  nextRow: () => {
    const { currentRow, currentWords, word, win, letters } = get()
    if (win !== undefined) return
    const currentWord = currentWords[currentRow]
    const lettersCopy = structuredClone(letters)
    if (currentWord.length !== word.length) return
    const next = currentRow + 1

    currentWord.forEach((letter, i) => {
      const index = lettersCopy.findIndex((els) => els.key.toLocaleLowerCase() === letter.toLocaleLowerCase())
      if (index >= 0 && !lettersCopy[index]) return
      const founded =
        letter.toLocaleLowerCase() === word[i].toLocaleLowerCase()
          ? true
          : word.toLocaleLowerCase().includes(letter.toLocaleLowerCase())
          ? false
          : undefined
      if (index === -1) {
        lettersCopy.push({ key: letter, foundAndExact: founded })
      } else {
        const prevFound = lettersCopy[index].foundAndExact
        if (prevFound) return
        if (prevFound === false) lettersCopy[index] = { key: letter, foundAndExact: founded }
      }
    })

    const words = structuredClone(currentWords)
    words[next] = []
    const winner = word.toLocaleLowerCase() === currentWords[currentRow].join('').toLocaleLowerCase()
    set({
      currentRow: next,
      currentWords: words,
      win: winner ? true : undefined,
      letters: lettersCopy
    })

    if (next >= ROW_LIMIT) {
      set({ win: winner })
    }
  },
  init: () => {},
  nextWord: (s) => {
    const { currentRow, currentWords, word, win } = get()
    if (win !== undefined) return
    if (currentWords[currentRow].length === word.length) return
    if (get().currentRow >= ROW_LIMIT) return
    const row = get().currentRow
    const words = structuredClone(get().currentWords)

    words[row].push(s)
    set({ currentWords: words })
  },
  prevLetter: () => {
    const { currentRow, currentWords } = get()
    if (currentWords[currentRow].length === 0) return

    const words = structuredClone(currentWords)
    words[currentRow].pop()
    set({ currentWords: words })
  },
  reset: () => {
    set({ ...initState, word: DEFAULT_WORDS[Math.floor(Math.random() * DEFAULT_WORDS.length)] }, true)
  }
}))
