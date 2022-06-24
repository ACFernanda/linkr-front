import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #333333;
  padding-top: 3%;

  @media (max-width: 613px) {
    padding-top: 20%;
  }
`;

const Main = styled.div`
  color: #ffffff;
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;

  .name-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
  }

  button.follow {
    width: 112px;
    height: 31px;
    margin-right: 5px;
    border: none;
    border-radius: 5px;
    font-family: "Lato";
    font-weight: 700;
    font-size: 14px;
  }

  section {
    display: flex;
  }

  @media (max-width: 613px) {
    width: 100%;
  }
`;

const UserTitle = styled.div`
  display: flex;
  align-items: center;
  
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
    margin-left: 18px;
  }

  @media (max-width: 613px) {
    h2 {
      margin-left: 12px;
      font-size: 33px;
      margin-bottom: 20px;
    }
  }
`;

const Message = styled.span`
  font-family: "Oswald";
  font-size: 30px;
  width: 100%;

  @media (max-width: 613px) {
    font-size: 20px;
  }
`;

export { Main, Container, UserTitle, Message };
