import styled from 'styled-components'
import SudokuSvg from '@public/icons/SudokuIcon.svg'
import Image from 'next/image'
import device from '@styles/device'

const ImageWrapper = styled.div`
  width: 100%;
  justify-content: center;
  z-index: 2;

  & > img {
    max-width:100%;
    max-height:100%;
  }

  @media ${device.min.tablet} {
    max-width: 50vh;
  }
`

export default function SudokuIcon() {
  return (
    <ImageWrapper>
      <Image alt="Sudoku board" src={SudokuSvg}/>
    </ImageWrapper>
  )
}