import styled from 'styled-components'

export const GameContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`

export const Header = styled.header`
  width: 100%;
  padding: 3rem;
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Footer = styled.footer`
  width: 100%;
  padding: 2rem;
  padding-top: 1rem;
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
  margin: 0.5rem;
  padding: 0.5rem;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: #555;
  }

  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
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
