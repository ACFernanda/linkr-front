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

  .new-posts {
    color: #ffffff;
    width: 100%;
    height: 38px;
    margin-bottom: 10px;
    background: #1877f2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: none;
    border-radius: 16px;
  }

  @media (max-width: 613px) {
    width: 100%;
  }
`;

const NewPostContainer = styled.div`
  padding: 12px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  margin: 10px 0 20px 0;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  @media (max-width: 613px) {
    border-radius: 0;
  }
`;

const PictureContainer = styled.div`
  img {
    height: 50px;
    max-width: 50px;
    border-radius: 50%;
    object-fit: cover;
  }

  @media (max-width: 613px) {
    display: none;
  }
`;

const InputsContainer = styled.div`
  width: 100%;
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  span {
    width: 100%;
    font-family: "Lato";
    font-weight: 300;
    font-size: 25px;
    line-height: 40px;
    color: #707070;

    @media (max-width: 613px) {
      font-weight: 300;
      font-size: 17px;
      line-height: 20px;
      text-align: center;

      padding-bottom: 10px;
    }
  }
  input {
    background: #efefef;
    border: none;
    border-radius: 5px;
    height: 30px;
    width: 100%;
    margin-bottom: 8px;
    padding-left: 12px;

    @media (max-width: 613px) {
      font-size: 13px;
      line-height: 16px;
    }
  }
  input#description {
    height: 80px;
  }
  input::placeholder {
    font-size: 16px;
    vertical-align: text-top;
    @media (max-width: 613px) {
      font-size: 13px;
      line-height: 16px;
    }
  }
  input:focus {
    outline: none;
  }
  button {
    height: 30px;
    width: 100px;
    float: right;
    color: #ffffff;
    background: #1877f2;
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    border: none;
    border-radius: 5px;
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

export {
  Main,
  Container,
  NewPostContainer,
  PictureContainer,
  InputsContainer,
  Message,
};
