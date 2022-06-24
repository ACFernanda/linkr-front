import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import Header from "../../components/Header";
import Post from "../../components/Post";
import { getPostsByHashtag } from "../../services/api";
import TokenContext from "../../contexts/TokenContext";
import { Container, Main } from "./style";
import Trending from "../../components/Trending";

export default function HashtagPage() {
  const { token } = useContext(TokenContext);
  const { word } = useParams();
  const [posts, setPosts] = useState([]);
  const [searchedWord, setSearchedWord] = useState("");

  async function renderPosts(word) {
    const response = await getPostsByHashtag(word, token);
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


