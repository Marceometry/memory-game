import styled, { css } from 'styled-components'

type CardContainerProps = {
  isHidden?: boolean
  isOpen?: boolean
}

const hidden = css`
  background: none;
`

const hover = css`
  &:not(:disabled):hover {
    background-color: #888;
  }
`

const flip = css`
  transform: scaleX(-1);
  img {
    opacity: 0;
    transition: opacity 0.1s;
  }
`

export const CardContainer = styled.button<CardContainerProps>`
  --size: min(10vw, 10vh);
  width: var(--size);
  height: var(--size);
  border-radius: 4px;
  color: #222;
  background-color: #aaa;
  transition-property: background-color, transform;
  transition-duration: 0.2s;
  overflow: hidden;
  display: grid;
  place-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    transition: opacity 0.3s;
  }

  ${({ isOpen }) => (!isOpen ? flip : '')}

  ${({ isHidden, disabled }) => {
    return isHidden ? hidden : !disabled && hover
  }}
`
