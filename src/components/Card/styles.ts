import styled, { css } from 'styled-components'

type CardContainerProps = {
  isHidden?: boolean
}

const hidden = css`
  background: none;
`

const hover = css`
  &:not(:disabled):hover {
    background-color: #888;
  }
`

export const CardContainer = styled.button<CardContainerProps>`
  --size: min(10vw, 10vh);
  width: var(--size);
  height: var(--size);
  border-radius: 4px;
  background-color: #aaa;
  transition: background-color 0.2s;
  display: grid;
  place-items: center;

  ${({ isHidden, disabled }) => {
    return isHidden ? hidden : !disabled && hover
  }}
`
