import styled from 'styled-components'

const Slot = styled.button`
  position: relative;
  width: 32px;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme, original }) => (original ? '#ffffff' : theme.main.color)};
  background-color: ${({ theme, original }) =>
    original ? theme.colors.primary : theme.main.lighter};
  cursor: pointer;
  font-weight: bold;
  transition: filter 0.3s;

  & > span {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    height: 100%;
    align-items: center;
    text-align: center;
    justify-content: center;
  }

  :before {
    content: '';
    display: block;
    padding-top: 100%;
  }

  :hover {
    filter: brightness(110%);
  }

  :active {
    filter: brightness(130%);
  }
`;

export default Slot;