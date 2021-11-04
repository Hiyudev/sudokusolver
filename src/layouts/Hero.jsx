import styled from 'styled-components'
import LogoIcon from '@icons/Logo'
import { PrimaryButton } from '@components/Button'
import Link from 'next/link'
import device from '@styles/device'
import Navbar from '@components/Nav';
import SudokuIcon from '@icons/SudokuIcon'

const Hero = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;

  overflow-y: hidden;
  
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
    align-items: center;
    text-align: center;
  }

  gap: 1rem;
  height: 100vh;
  max-height: 800px;
  color: white;
  background:#99c9ff;
  background-image:  
  radial-gradient(at 30% 21%, hsla(357,86%,79%,1) 0, transparent 59%),  
  radial-gradient(at 91% 56%, hsla(282,92%,66%,1) 0, transparent 56%),  
  radial-gradient(at 47% 4%, hsla(307,98%,70%,1) 0, transparent 55%),  
  radial-gradient(at 94% 14%, hsla(233,65%,73%,1) 0, transparent 46%),  
  radial-gradient(at 12% 88%, hsla(308,71%,72%,1) 0, transparent 46%),  
  radial-gradient(at 25% 71%, hsla(10,87%,75%,1) 0, transparent 51%),  
  radial-gradient(at 80% 50%, hsla(357,64%,65%,1) 0, transparent 41%);
  clip-path: polygon(0 0, 100% 0, 100% 75%, 0 100%);
`

Hero.Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;

  @media ${device.min.mobile} {
    flex-direction: row;
  }
`

Hero.Image = styled.div`
  transition: transform 0.3s;
  transform: none;
  opacity: 65%;

  @media ${device.min.mobile} {
    transform: rotateY(-20deg) rotateX(20deg);
  }

  :hover {
    transform: none;
  }
`

Hero.Button = styled(PrimaryButton)`
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 3rem;
  padding-right: 3rem;
`

const Message = styled.div`
  p {
    font-size: 1.2rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`

export default function HeroSection() {
  return (
    <Hero>
      <Navbar />

      <Hero.Content>
        <Message>
          <LogoIcon />

          <p>A online recourse for solving a sudoku with a few numbers</p>

          <Link href={"/solver"}>
            <Hero.Button>
              Solve
            </Hero.Button>
          </Link>
        </Message>

        <Hero.Image>
          <SudokuIcon />
        </Hero.Image>
      </Hero.Content>

    </Hero>
  )
}