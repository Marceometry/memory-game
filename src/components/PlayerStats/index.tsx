import { PlayerStatsContainer } from './styles'

export type PlayerStatsProps = {
  name: string
  wins: number
  cards: string[]
  isCurrentPlayer: boolean
}

export const PlayerStats = ({
  name,
  wins,
  cards,
  isCurrentPlayer,
}: PlayerStatsProps) => {
  return (
    <PlayerStatsContainer>
      <h2 style={{ color: isCurrentPlayer ? '#19b619' : '' }}>{name}</h2>
      <span>Vitórias: {wins}</span>
      <div>{cards.join(' | ')}</div>
    </PlayerStatsContainer>
  )
}
