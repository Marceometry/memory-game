import { CardContainer } from './styles'

export type CardProps = {
  id: string
  // src: string
  isOpen?: boolean
  wasFound?: boolean
  disabled?: boolean
  onClick?: () => void
}

export const Card = ({
  id,
  isOpen,
  wasFound,
  onClick,
  disabled,
}: CardProps) => {
  const isDisabled = disabled || isOpen || wasFound
  return (
    <CardContainer
      as={isDisabled ? 'span' : 'button'}
      isHidden={wasFound}
      disabled={isDisabled}
      onClick={!isDisabled ? onClick : undefined}
    >
      {/* <img src={src} alt='' /> */}
      {isOpen ? id : ''}
    </CardContainer>
  )
}
