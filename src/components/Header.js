import React, { useContext, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { IconContext } from "react-icons";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import TokenContext from "../contexts/TokenContext";
import { desactivateToken } from "./../services/api";

export default function Header() {
  const [visibility, setVisibility] = useState(false);
  const { user } = useContext(UserContext);
  const { token } = useContext(TokenContext);

  const navigate = useNavigate();

  function logout() {
    navigate("/");
    desactivateToken(token);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  return (
    <Container>
      <p>linkr</p>
      <SearchBar />
      <section>
        <IconContext.Provider value={{ className: "react-icons" }}>
          <button onClick={() => setVisibility(!visibility)}>
            {!visibility ? <BsChevronDown /> : <BsChevronUp />}
          </button>
        </IconContext.Provider>
        <img
          onClick={() => setVisibility(!visibility)}
          src={user.pictureURL}
          alt="profile-pic"
        />
        <Logout onClick={() => logout()} visibility={visibility.toString()}>
          <p>Logout</p>
        </Logout>
      </section>
    </Container>
  );
}

const Container = styled.div`
  height: 60px;
  background: #151515;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 613px) {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  p {
    font-family: "Passion One", cursive;
    color: #ffffff;
    font-size: 50px;
    letter-spacing: 0.05em;
  }

  .search {
    width: 60%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -22px);
    @media (max-width: 613px) {
      top: 100%;
      left: 50%;
      transform: translate(-50%, 10px);

      max-width: 350px;
      width: 95%;
    }
  }

  section {
    button {
      background-color: #151515;
      border: none;
    }
    .react-icons {
      color: #ffffff;
      font-size: 25px;
    }
    img {
      height: 40px;
      max-width: 40px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
`;

const Logout = styled.div`
  z-index: 1;
  position: absolute;
  top: 59px;
  right: 2px;
  width: 150px;
  height: 47px;
  background-color: #171717;
  border-radius: 0 0 0 20px;
  display: ${(props) => (props.visibility === "false" ? "none" : "inline")};

  p {
    font-family: "Lato";
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: 0.05em;
    color: #ffffff;
    padding: 13px 0px;
    text-align: center;
  }
`;
