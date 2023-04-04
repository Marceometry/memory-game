import styled from 'styled-components'

export const GameContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
`

export const Header = styled.header`
  width: 100vw;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    display: flex;
    flex-direction: column;
    gap: 8px;

    &:last-child {
      align-items: flex-end;
    }
  }
`

export const Footer = styled.footer`
  width: 100vw;
  padding: 1rem 2rem;
  display: grid;
  place-items: center;
`

type CardsContainerProps = {
  gridColumns: number
}

export const CardsContainer = styled.main<CardsContainerProps>`
  width: fit-content;
  display: grid;
  grid-template-columns: repeat(${({ gridColumns }) => gridColumns}, 1fr);
  gap: 1rem;
`
