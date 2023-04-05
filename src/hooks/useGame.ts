import { useState, useMemo, useEffect } from 'react'
import { QUANTITY_OF_PAIRS, SHOW_CARD_TIMEOUT } from '../constants'
import { getCards } from '../utils'

type Player = { wins: number; cards: string[] }
const playerInitialState: Player = { wins: 0, cards: [] }
const playersInitialState = [playerInitialState, playerInitialState]

export const useGame = (quantityOfPairs = QUANTITY_OF_PAIRS) => {
  const [players, setPlayers] = useState([...playersInitialState])
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [foundCards, setFoundCards] = useState<string[]>([])
  const [openedCards, setOpenedCards] = useState<string[]>([])

  const hasFinished = useMemo(
    () => foundCards.length === quantityOfPairs * 2,
    [foundCards.length, quantityOfPairs]
  )

  const cards = useMemo(
    () => getCards(quantityOfPairs),
    [quantityOfPairs, hasFinished]
  )

  const openCard = (id: string) => {
    setOpenedCards((state) => [...state, id])
  }

  const closeCards = () => setOpenedCards([])

  const checkCards = (id1: string, id2: string) => {
    if (id1.split('-')[0] === id2.split('-')[0]) return true
  }

  const resetGame = () => {
    setFoundCards([])
    setPlayers((state) =>
      state.map((item) => {
        return {
          ...item,
          cards: [],
        }
      })
    )
  }

  useEffect(() => {
    if (openedCards.length > 2) return setOpenedCards([])
    if (openedCards.length < 2) return

    const hasFound = checkCards(openedCards[0], openedCards[1])
    setTimeout(() => {
      if (hasFound) {
        setFoundCards((state) => [...state, ...openedCards])
        setPlayers((state) =>
          state.map((item, index) => {
            if (index !== currentPlayer) return item
            const playerCards = openedCards.map(
              (item) => cards.find((card) => card.id === item)?.src || ''
            )
            return { ...item, cards: [...item.cards, ...playerCards] }
          })
        )
      } else {
        setCurrentPlayer((state) => (!state ? 1 : 0))
      }
      closeCards()
    }, SHOW_CARD_TIMEOUT)
  }, [openedCards])

  useEffect(() => {
    if (hasFinished) {
      setPlayers((state) => {
        return state.map((item, index) => ({
          ...item,
          wins:
            index === 0 && item.cards.length > state[1].cards.length
              ? item.wins + 1
              : index === 1 && item.cards.length > state[0].cards.length
              ? item.wins + 1
              : item.wins,
        }))
      })
    }
  }, [hasFinished])

  return {
    cards,
    currentPlayer,
    foundCards,
    hasFinished,
    openCard,
    openedCards,
    players,
    resetGame,
  }
}
