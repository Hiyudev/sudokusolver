import styled from "styled-components"
import device from "@styles/device"

const Section = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 2rem;

  background-color: ${({ theme, diffbg }) => diffbg ? theme.main.light : ''};
  
  padding-top: 4rem;
  padding-bottom: 4rem;

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
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  align-items: center;

  @media ${device.min.mobile} {
    flex-direction: ${props => props.onlycolumn ? 'column' : props.rowrevert ? 'row-reverse' : 'row'};
  }

  @media ${device.max.mobile} {
    div {
      p, li {
        font-size: 1rem;
      }
    }
  }

  div {
    p, li {
      font-size: 1.2rem;
    }
    li:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`

export default Section;