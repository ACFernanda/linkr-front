import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useContext, useState } from "react";
import Header from "../components/Header";
import Post from "../components/Post";
import { getPostsByHashtag } from "../services/api";
import Trending from "../components/Trending";
import TokenContext from "../contexts/TokenContext";

export default function HashtagPage() {
  const { token } = useContext(TokenContext);
  const { word } = useParams();
  const [posts, setPosts] = useState([]);
  const [searchedWord, setSearchedWord] = useState("");

  async function renderPosts(word) {
    const response = await getPostsByHashtag(word, token);
    console.log(response);
    setPosts(response.data);
    setSearchedWord(word);
  }
  if (word !== searchedWord) {
    renderPosts(word);
  }
  return (
    <>
      <Header />
      <Container>
        <h2># {word}</h2>
        <section>
          <Main>
            {posts.map((post) => (
              <Post post={post} />
            ))}
          </Main>
          <Trending />
        </section>
      </Container>
    </>
  );
}

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
`;

const Main = styled.div`
  color: #ffffff;
  height: 100%;

  h2 {
    font-family: "Oswald";
    font-weight: 700;
    font-size: 38px;
    margin-bottom: 25px;
  }
`;
