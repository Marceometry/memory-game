import styled from 'styled-components'

export const GameContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`

export const Header = styled.header`
  width: 100vw;
  padding: 3rem;
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Footer = styled.footer`
  width: 100vw;
  padding: 2rem;
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

export const FinishedGame = styled.div`
  display: grid;
  place-items: center;

  button {
    padding: 8px 16px;
    border-radius: 4px;
    background-color: #ddd;
    color: #222;
    transition: background-color 0.2s;

    &:hover {
      background-color: #bbb;
    }
  }
`
