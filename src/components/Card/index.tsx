import { CardContainer } from './styles'

export type CardProps = {
  id: string
  src: string
  isOpen?: boolean
  wasFound?: boolean
  disabled?: boolean
  onClick?: () => void
}

export const Card = ({
  id,
  src,
  isOpen,
  wasFound,
  onClick,
  disabled,
}: CardProps) => {
  const isDisabled = disabled || isOpen || wasFound
  return (
    <CardContainer
      isHidden={wasFound}
      isOpen={isOpen}
      disabled={isDisabled}
      onClick={!isDisabled ? onClick : undefined}
    >
      {<img src={src} alt={id.split('-')[0]} draggable={false} />}
    </CardContainer>
  )
}
