import { Card, PlayerStats } from './components'
import { useGame } from './hooks'
import {
  CardsContainer,
  FinishedGame,
  Footer,
  GameContainer,
  GlobalStyle,
  Header,
} from './styles'

export function App() {
  const {
    cards,
    currentPlayer,
    foundCards,
    hasFinished,
    openCard,
    openedCards,
    players,
    resetGame,
  } = useGame(15)

  const gridColumns = Math.ceil(Math.sqrt(cards.length))

  return (
    <GameContainer>
      <GlobalStyle />

      <Header>
        {players.map((player, index) => (
          <PlayerStats
            name={`Jogador ${index + 1}`}
            align={index === 1 ? 'right' : 'left'}
            wins={player.wins}
            cards={player.cards}
            isCurrentPlayer={currentPlayer === index}
          />
        ))}
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
        <span>
          Feito por{' '}
          <a href='https://github.com/Marceometry' target='_blank'>
            Marcelino Teixeira
          </a>
        </span>
      </Footer>
    </GameContainer>
  )
}
