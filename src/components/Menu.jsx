import styled from 'styled-components'
import device from '@styles/device'

const Menu = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 20;
  background-color: ${({ theme }) => theme.main.dark};
  align-items: center;

  justify-content: center;
  gap: 1rem;

  flex-direction: column;
  @media ${device.min.mobile} {
    gap: 2rem;
    flex-direction: row;
  }
`;

Menu.Title = styled.h2`
  margin: 0;
  text-align: center;
`;

Menu.Body = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export default Menu;