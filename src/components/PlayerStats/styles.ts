import styled from 'styled-components'

export const PlayerStatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  &:last-child {
    align-items: flex-end;
  }

  > div {
    height: 24px;
  }
`
