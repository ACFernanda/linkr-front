import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

import { signUp } from "../services/api.js";

export default function SignUp() {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    imageURL: "",
  });

  const navigate = useNavigate();

  async function handleSignup() {
    try {
      const body = {
        email: formData.email,
        password: formData.password,
        username: formData.username,
        imageURL: formData.imageURL,
      };
      const response = await signUp(body);
      handleSuccess(response);
    } catch (error) {
      handleError(error);
    }
  }

  function handleSuccess() {
    navigate("/");
  }

  function handleError(error) {
    alert(`Error: ${error.response.data.message}`);
    resetAll();
  }

  function resetAll() {
    setHasSubmitted(false);
    setFormData({
      email: "",
      password: "",
      username: "",
      imageURL: "",
    });
  }

  function getRandomInt(max, min) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function validateForm() {
    return formData.email?.length > 0 &&
      formData.password?.length > 0 &&
      formData.username?.length > 0 &&
      formData.imageURL?.length > 0 &&
      !hasSubmitted
      ? ""
      : "disabled";
  }

  return (
    <RightSide>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setHasSubmitted(true);
          setTimeout(() => {
            handleSignup();
          }, getRandomInt(500, 1000));
        }}
      >
        <input
          type="email"
          placeholder="e-mail"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          disabled={hasSubmitted}
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          disabled={hasSubmitted}
          required
        />
        <input
          type="text"
          placeholder="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          disabled={hasSubmitted}
          required
        />
        <input
          type="url"
          placeholder="picture url"
          name="imageURL"
          value={formData.imageURL}
          onChange={handleInputChange}
          disabled={hasSubmitted}
          required
        />
        <button type="submit" className={validateForm()} disabled={hasSubmitted}>
          {!hasSubmitted ? (
            "Sign Up"
          ) : (
            <ThreeDots color="#FFFFFF" height="15px" />
          )}
        </button>
      </form>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <h3>Switch back to log in</h3>
      </Link>
    </RightSide>
  );
}

const RightSide = styled.section`
  & {
    display: flex;
    height: 100vh;
    width: 40vw;
    right: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #333333;

    @media (max-width: 613px) {
      height: calc(100vh - 175px);
      width: 100vw;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    margin: 0 auto 22px auto;
  }

  input {
    width: 429px;
    height: 65px;
    background: #ffffff;
    border-radius: 6px;
    border: 1px solid #fff;
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 25px;
    line-height: 40px;
    color: #000000;
    margin: 0 auto 13px auto;
    padding-left: 17px;

    ::placeholder {
      color: #9f9f9f;
    }

    :disabled{
      background-color: lightgray;
    }

    @media (max-width: 613px) {
      width: 330px;
      height: 55px;
    }
  }

  button {
    width: 429px;
    height: 65px;
    background: #1877f2;
    border-radius: 6px;
    border: 1px solid #1877f2;
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    :disabled {
      background-color: lightgray;
    }

    @media (max-width: 613px) {
      width: 330px;
      height: 55px;
    }
  }

  h3 {
    width: 262px;
    height: 24px;
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    text-decoration-line: underline;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 613px) {
      font-size: 17px;
      line-height: 20px;
    }
  }
`;
