import styled from 'styled-components'
import device from '@styles/device'
import Card from './Card'

const Table = styled.main`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding-top: 1rem;

  padding-left: 8rem;
  padding-right: 8rem;

  @media ${device.max.laptop} {
    padding-left: 3rem;
    padding-right: 3rem;
  }

  @media ${device.max.tablet} {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  @media ${device.max.mobile} {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

Table.Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  height: 3rem;
  gap: 3rem;
  background-color: transparent;
`;

Table.Grid = styled(Card)`
  display: grid;

  grid-gap: 1rem;
  @media ${device.max.mobile} {
    grid-gap: 0;
  }

  justify-items: center;
  grid-template-columns: repeat(9, minmax(32px, 1fr));
  grid-template-rows: repeat(9, minmax(32px, 1fr));
`;

export default Table;