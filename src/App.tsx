import { useEffect, useState } from 'react'
import { Card } from './components'
import {
  CardsContainer,
  Footer,
  GameContainer,
  GlobalStyle,
  Header,
} from './styles'
import { shuffle } from './utils'

const quantityOfPairs = 10
const cards = new Array(quantityOfPairs)
  .fill('')
  .reduce((acc: string[], item: string, index) => {
    const ids = [`${index + 1}-1`, `${index + 1}-2`]
    return [...acc, ...ids]
  }, [])

const gridColumns = Math.ceil(Math.sqrt(cards.length))
const shuffledCards = shuffle(cards)

const playerInitialState = { wins: 0, cards: [] } as {
  wins: number
  cards: string[]
}
const playersInitialState = [playerInitialState, playerInitialState]

export function App() {
  const [players, setPlayers] = useState([...playersInitialState])
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [foundCards, setFoundCards] = useState<string[]>([])
  const [openedCards, setOpenedCards] = useState<string[]>([])

  const openCard = (id: string) => {
    setOpenedCards((state) => [...state, id])
  }

  const closeCards = () => setOpenedCards([])

  const checkCards = (id1: string, id2: string) => {
    //////////////////////////////////// BUG INDEX 0
    if (id1.charAt(0) === id2.charAt(0)) return true
  }

  useEffect(() => {
    if (openedCards.length > 2) return setOpenedCards([])
    if (openedCards.length < 2) return

    const hasFound = checkCards(openedCards[0], openedCards[1])
    setTimeout(() => {
      if (hasFound) {
        setFoundCards((state) => [...state, ...openedCards])
        console.log(openedCards)
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
    }, 500)
  }, [openedCards])

  useEffect(() => {
    if (foundCards.length === shuffledCards.length) {
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
      setTimeout(() => {
        setFoundCards([])
        setPlayers((state) =>
          state.map((item) => {
            return {
              ...item,
              cards: [],
            }
          })
        )
      }, 1000)
    }
  }, [foundCards])

  return (
    <GameContainer>
      <GlobalStyle />

      <Header>
        <div>
          <h2 style={{ color: currentPlayer === 0 ? 'green' : '' }}>
            Jogador 1
          </h2>
          <span>Vitórias: {players[0].wins}</span>
          <div>{players[0].cards.join(' | ')}</div>
        </div>

        <div>
          <h2 style={{ color: currentPlayer === 1 ? 'green' : '' }}>
            Jogador 2
          </h2>
          <span>Vitórias: {players[1].wins}</span>
          <div>{players[1].cards.join(' | ')}</div>
        </div>
      </Header>

      <CardsContainer gridColumns={gridColumns}>
        {shuffledCards.map((card) => (
          <Card
            id={card}
            key={card}
            isOpen={openedCards.includes(card)}
            wasFound={foundCards.includes(card)}
            onClick={() => openCard(card)}
            disabled={openedCards.length > 1}
          />
        ))}
      </CardsContainer>

      <Footer>
        <span>Made by Marcelino Teixeira</span>
      </Footer>
    </GameContainer>
  )
}
