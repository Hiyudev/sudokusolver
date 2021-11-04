import styled from "styled-components"
import SwitchButton from './SwitchButton'
import { useTheme } from '../hooks/Theme'

const Nav = styled.nav`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  height: 3rem;
  margin-bottom: 2rem;
  background-color: transparent;
`

const ToggleButton = styled(SwitchButton)`
  :focus {
    outline: 0;
  }

  border: 2px solid #f1c40f;

  :after {
    background: None;
    background-image: url('./icons/Sun.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  :checked {
    :after {
      background-image: url('./icons/Moon.svg');
    }
  }
`;

export default function Navbar() {
  const { usertheme, changeTheme } = useTheme();
  const handleTheme = (b) => {
    const theme = b ? "dark" : "light";
    changeTheme(theme);
  }

  return (
    <Nav>
      <ToggleButton onChange={(e) => handleTheme(e.target.checked)} checked={usertheme === "dark"} type="checkbox" />
    </Nav>
  )
}