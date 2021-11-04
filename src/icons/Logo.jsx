import styled from 'styled-components';
import device from '../styles/device'

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  justify-content: flex-start;

  @media ${device.min.tablet} {
    flex-direction: row;
  }
`

Logo.Image = styled.img`
  min-height: 15vmin;
  pointer-events: none;
`

Logo.Font = styled.span`
  font-size: 2rem;
  font-weight: bold;
`

export default function LogoIcon() {
  return (
    <Logo>
      <Logo.Image src='./icons/logo.svg' alt="Sudoku Solver Logo" />
      <Logo.Font>Sudoku Solver</Logo.Font>
    </Logo>
  )
}