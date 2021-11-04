import styled from 'styled-components'
import Image from 'next/image'

const Option = styled.div`
  display: flex;

  height: 150px;
  width: 250px;

  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.main.color};
  background-color: ${({ theme }) => theme.main.lighter};
  border-radius: 2rem;
  padding: 2rem;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

  border-width: ${({ bordered }) => bordered && '2px'};
  border-style: ${({ bordered }) => bordered && 'dashed'};
  border-color: ${({ hover, theme, bordered }) =>
    bordered && hover ? theme.colors.primary : theme.main.color};

  transition: filter 0.3s, opacity 0.3s;

  :hover {
    filter: brightness(110%);
  }

  p {
    text-align: center;
  }
`;

Option.Img = styled(Image)`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export default Option;