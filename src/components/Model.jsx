import styled from "styled-components";

const Model = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  display: ${({hidden}) => hidden ? 'hidden' : 'flex'};
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.8);
  z-index: 9999;
`

export default Model;