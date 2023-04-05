import { keyframes } from 'styled-components'

const distance = 25

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(${distance}%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(-${distance}%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

export const slideIn = {
  left: slideInLeft,
  right: slideInRight,
}
