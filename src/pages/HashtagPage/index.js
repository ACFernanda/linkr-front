import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import Post from "../../components/Post";
import { getPostsByHashtag } from "../../services/api";
import TokenContext from "../../contexts/TokenContext";
import { Container, Main } from "./style";
import Trending from "../../components/Trending";
import InfiniteScroll from "react-infinite-scroller";
import LoadingMorePost from "../../components/LoadingMorePost";

export default function HashtagPage() {
  const { token } = useContext(TokenContext);
  const { word } = useParams();

  const [posts, setPosts] = useState([]);
  //const [searchedWord, setSearchedWord] = useState("");
  const [offset, setOffset] = useState(0);
  const [hasMorePost, setHasMorePosts] = useState(true);

  useEffect((() => {
    const promise = getPostsByHashtag(word, 0, token);
    promise.then((response) => {
      console.log(response);
      setPosts(response.data);
      setOffset(0);
      setHasMorePosts(true);
      if (response.data.length < 10) {
        setHasMorePosts(false);
      }
    })
    promise.catch((e) =>
      alert(
        "An error occured while trying to fetch the posts, please refresh the page."
      )
    );
  }),
    [word]);

  function getMorePosts() {
    const promise = getPostsByHashtag(word, offset + 1, token);
    promise.then((res) => {
      setPosts([...posts, ...res.data]);
      setOffset(offset + 1);
      if (res.data.length < 10) {
        setHasMorePosts(false);
      }
    });
    promise.catch((e) =>
      alert(
        "An error occured while trying to fetch the posts, please refresh the page."
      )
    );
  }

  return (
    <>
      <Header />
      <Container>
        <h2># {word}</h2>
        <section>
          <Main>
            <InfiniteScroll
              pageStart={0}
              loadMore={() => { setTimeout(getMorePosts, 2000) }}
              hasMore={hasMorePost}
              loader={<LoadingMorePost />}
            >
              {posts.map((post) => (
                <Post post={post} />
              ))}
            </InfiniteScroll>
          </Main>
          <Trending />
        </section>
      </Container>
    </>
  );
}


