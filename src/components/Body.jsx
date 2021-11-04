import device from "../styles/device";
import styled from "styled-components";

const Body = styled.div`
  min-height: 100vh;
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
  
  background-color: ${({ theme }) => theme.main.dark};
  color: ${({ theme }) => theme.main.color};
  gap: 2rem;
`;

const GradientBody = styled(Body)`
  background: ${({ theme }) => 'linear-gradient(180deg, ' + theme.main.dark + ' 0%, ' + theme.colors.primary + ' 100%)'};
`

Body.Content = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction: column;
`

export { Body, GradientBody };