import { useEffect, useMemo, useState } from 'react'
import { SHOW_CARD_TIMEOUT } from './constants'
import { Card } from './components'
import { getCards } from './utils'
import {
  CardsContainer,
  FinishedGame,
  Footer,
  GameContainer,
  GlobalStyle,
  Header,
} from './styles'
import { PlayerStats } from './components/PlayerStats'

const cards = getCards()
const gridColumns = Math.ceil(Math.sqrt(cards.length))

type Player = { wins: number; cards: string[] }
const playerInitialState = { wins: 0, cards: [] } as Player
const playersInitialState = [playerInitialState, playerInitialState]

export function App() {
  const [players, setPlayers] = useState([...playersInitialState])
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [foundCards, setFoundCards] = useState<string[]>([])
  const [openedCards, setOpenedCards] = useState<string[]>([])

  const hasFinished = useMemo(
    () => foundCards.length === cards.length,
    [foundCards.length]
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
            return { ...item, cards: [...item.cards, ...openedCards] }
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

  return (
    <GameContainer>
      <GlobalStyle />

      <Header>
        <PlayerStats
          name='Jogador 1'
          wins={players[0].wins}
          cards={players[0].cards}
          isCurrentPlayer={currentPlayer === 0}
        />

        <PlayerStats
          name='Jogador 2'
          wins={players[1].wins}
          cards={players[1].cards}
          isCurrentPlayer={currentPlayer === 1}
        />
      </Header>

      {hasFinished ? (
        <FinishedGame>
          <button onClick={resetGame}>Novo jogo</button>
        </FinishedGame>
      ) : (
        <CardsContainer gridColumns={gridColumns}>
          {cards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              src={card.src}
              isOpen={openedCards.includes(card.id)}
              wasFound={foundCards.includes(card.id)}
              onClick={() => openCard(card.id)}
              disabled={openedCards.length > 1}
            />
          ))}
        </CardsContainer>
      )}

      <Footer>
        <span>Made by Marcelino Teixeira</span>
      </Footer>
    </GameContainer>
  )
}
