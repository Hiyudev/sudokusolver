import styled from "styled-components";

const Card = styled.div`
  padding: 1rem;
  background-color: ${({ theme }) => theme.main.light};
  color: ${({ theme }) => theme.main.color};
  border-radius: 1rem;
`

export default Card;