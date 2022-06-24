import styled from "styled-components";

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 60%;
  background-color: #333333;
  padding-top: 3%;

  h2 {
    font-family: "Oswald";
    font-weight: 700;
    font-size: 38px;
    color: #ffffff;
    margin-bottom: 40px;
  }

  section {
    display: flex;
    flex-direction: row;
  }

  @media (max-width: 613px) {
    width: 100%;
    padding-top: 20%;

    h2 {
      margin-bottom: 20px;
    }
  }
`;

const Main = styled.div`
  color: #ffffff;
  height: 100%;
  width: 100%;

  img {
    height: 50px;
    max-width: 50px;
    border-radius: 50%;
    object-fit: cover;
  }

  h2 {
    font-family: "Oswald";
    font-weight: 700;
    font-size: 38px;
    margin-bottom: 25px;
  }
`;

export { Container, Main };
