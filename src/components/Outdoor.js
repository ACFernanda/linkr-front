import styled from "styled-components";

export default function Outdoor() {
  return (
    <LeftSide>
      <h1>linkr</h1>
      <h2>save, share and discover</h2>
      <h2>the best links on the web</h2>
    </LeftSide>
  );
}

const LeftSide = styled.div`
  display: flex;
  width: 60%;
  left: 0;
  top: 0;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  padding-left: 10%;
  background-color: #151515;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);

  h1 {
    font-family: "Passion One";
    font-style: normal;
    font-weight: 700;
    font-size: 106px;
    letter-spacing: 0.05em;
    color: #ffffff;
  }
  h2 {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    color: #ffffff;
  }

  @media (max-width: 613px) {
    width: 100vw;
    height: 22vh;
    align-items: center;
    padding-left: 0;

    h1 {
      font-size: 76px;
    }

    h2 {
      font-size: 25px;
      line-height: 35px;
    }
  }
`;
