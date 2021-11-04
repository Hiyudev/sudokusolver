import device from '@styles/device';
import styled from 'styled-components'

const Title = styled.h2`
  position: relative;
  font-size: 4rem;
  margin-top: 0;
  margin-bottom: 2rem;
  
  @media ${device.max.mobile} {
    font-size: 2rem;
  }

  :hover {
    :after {
      width: 50%;
    }
  }
  
  :after {
    transition: width 0.3s;
    content:"";
    width: 0;
    position: absolute;
    top: 2rem;
    bottom: 0;
    left: 0;
    right: 0;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  }

`

export default Title;