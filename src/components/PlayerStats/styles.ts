import styled from 'styled-components'
import { slideIn } from './animations'

export const PlayerStatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  &.right {
    align-items: flex-end;
    text-align: right;
  }
`

type PlayerNameProps = {
  isCurrentPlayer: boolean
}

export const PlayerName = styled.h2<PlayerNameProps>`
  color: ${(props) => (props.isCurrentPlayer ? '#19b619' : 'inherit')};
`

type CardsSectionProps = {
  reverse: boolean
}

export const CardsSection = styled.div<CardsSectionProps>`
  height: 24px;
  display: flex;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
`

type CardsPairProps = {
  align: 'left' | 'right'
}

export const CardsPair = styled.div<CardsPairProps>`
  display: inline-block;
  animation: ${({ align }) => slideIn[align]} 0.3s linear;
`

type CardItemProps = {
  translateValue: number
}

export const CardItem = styled.div<CardItemProps>`
  width: 24px;
  height: 24px;
  display: inline-block;
  border: 1px solid #aaa;
  background-color: white;
  border-radius: 2px;
  overflow: hidden;
  transform: translateX(${(props) => props.translateValue}px);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
  }
`
