import { QUANTITY_OF_PAIRS, images } from '../constants'

export const shuffle = (array: any[]) =>
  array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

export const getCards = (): Array<{ id: string; src: string }> => {
  const shuffledImages = shuffle(images)

  const cards = new Array(QUANTITY_OF_PAIRS)
    .fill('')
    .reduce((acc: string[], _, index) => {
      const src = shuffledImages[index]
      const id = index + 1
      const ids = [
        { src, id: `${id}-1` },
        { src, id: `${id}-2` },
      ]
      return [...acc, ...ids]
    }, [])

  return cards // shuffle(cards)
}
