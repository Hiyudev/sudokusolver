import device from "@styles/device";
import styled from "styled-components";

export const Button = styled.button`
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: ${({ theme }) => theme.main.color};
  background-color: ${({ theme }) => theme.main.lighter};
  opacity: ${({ disabled }) => disabled ? 0.6 : 1};
  transition: opacity 0.3s, filter 0.3s;

  :enabled {
    :hover {
      filter: brightness(110%)
    }
    
    :active {
      filter: brightness(130%)
    }
  }

  @media ${device.max.mobile} {
    width: 100%;
  }
`

export const PrimaryButton = styled(Button)`
  color: #fff;
  background-color: ${({ theme }) => theme.colors.primary};
`

export const CorrectButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.correct};
`

export const ErrorButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.error};
`