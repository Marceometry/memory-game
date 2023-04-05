import {
  CardItem,
  CardsPair,
  CardsSection,
  PlayerName,
  PlayerStatsContainer,
} from './styles'

export type PlayerStatsProps = {
  name: string
  wins: number
  cards: string[]
  isCurrentPlayer: boolean
  align?: 'left' | 'right'
}

export const PlayerStats = ({
  name,
  wins,
  cards,
  align = 'left',
  isCurrentPlayer,
}: PlayerStatsProps) => {
  const pairs = cards.reduce((acc, card) => {
    const pairIndex = acc.findIndex((item) => item[0] === card)
    if (pairIndex === -1) {
      acc = [...acc, [card]]
    } else {
      acc[pairIndex] = [acc[pairIndex][0], card]
    }
    return acc
  }, [] as string[][])

  return (
    <PlayerStatsContainer className={align}>
      <PlayerName isCurrentPlayer={isCurrentPlayer}>{name}</PlayerName>
      <span> Vitórias: {wins}</span>

      <CardsSection reverse={align === 'right'}>
        {pairs.map((pair) => (
          <CardsPair align={align}>
            {pair.map((item, index) => {
              const indexToTranslate = align === 'right' ? 0 : 1
              const shouldTranslate = index === indexToTranslate
              const translate = !shouldTranslate
                ? 0
                : align === 'right'
                ? 8
                : -8
              return (
                <CardItem translateValue={translate}>
                  <img src={item} draggable={false} />
                </CardItem>
              )
            })}
          </CardsPair>
        ))}
      </CardsSection>
    </PlayerStatsContainer>
  )
}
