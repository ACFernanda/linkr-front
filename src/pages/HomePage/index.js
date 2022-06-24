import { useState, useEffect, useContext } from "react";

import Header from "../../components/Header";
import Post from "../../components/Post";
import Trending from "../../components/Trending";
import TokenContext from "../../contexts/TokenContext";
import UserContext from "../../contexts/UserContext";
import InfiniteScroll from "react-infinite-scroller";
import { getAllPosts, publishPost, getAllFollowing } from "../../services/api";
import {
  Main,
  Container,
  NewPostContainer,
  PictureContainer,
  InputsContainer,
  Message,
} from "./style";
import LoadingMorePost from "../../components/LoadingMorePost";

const HomePage = () => {
  const { token } = useContext(TokenContext);
  const { user } = useContext(UserContext);

  return (
    <>
      <Header />
      <Container>
        <h2>timeline</h2>
        <section>
          <Main>
            <NewPost token={token} user={user} />
            <RenderPosts token={token} />
          </Main>
          <Trending />
        </section>
      </Container>
    </>
  );
};

const RenderPosts = ({ token }) => {
  const [posts, setPosts] = useState();
  const [following, setFollowing] = useState();
  const [offset, setOffset] = useState(0);
  const [hasMorePost, setHasMorePosts] = useState(true);
  useEffect(() => {
    (() => {
      const postsResponse = getAllPosts(0, token);
      postsResponse.then((res) => {
        setPosts(res.data);
        setOffset(0);
        setHasMorePosts(true);
        if(res.data.length < 10) {
          setHasMorePosts(false);
        }
      });
      postsResponse.catch((e) =>
        alert(
          "An error occured while trying to fetch the posts, please refresh the page."
        )
      );

      const followingResponse = getAllFollowing(token);
      followingResponse.then((res) => setFollowing(res.data));
      followingResponse.catch((e) =>
        alert(
          "An error occured while trying to fetch the posts, please refresh the page."
        )
      );
    })();
  }, []);

  
  function getMorePosts() {
    const postsResponse = getAllPosts(offset + 1, token);
    postsResponse.then((res) => {
      setPosts([...posts, ...res.data]);
      setOffset(offset + 1);
      if (res.data.length < 10) {
        setHasMorePosts(false);
      }
    });
    postsResponse.catch((e) =>
      alert(
        "An error occured while trying to fetch the posts, please refresh the page."
      )
    );
  }
  
  if (!posts || !following) return <Message>Loading...</Message>;

  if (!following.length)
    return (
      <Message>You don't follow anyone yet. Search for new friends!</Message>
    );

  if (!posts.length) return <Message>No posts found from your friends</Message>;

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={() => {setTimeout(getMorePosts, 2000)}}
      hasMore={hasMorePost}
      loader={<LoadingMorePost />}
    >
      {posts.map((post, index) => <Post post={post} key={index} />)}
    </InfiniteScroll>
  )
};

const NewPost = ({ token, user }) => {
  const [formData, setFormData] = useState({
    url: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState({
    placeholder: "Publish",
    disabled: false,
  });

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    isLoading.placeholder = "Publishing...";
    isLoading.disabled = true;
    setIsLoading({ ...isLoading });

    try {
      await publishPost({ ...formData }, token);

      isLoading.placeholder = "Publish";
      isLoading.disabled = false;
      setIsLoading({ ...isLoading });

      formData.url = "";
      formData.description = "";
      setFormData({ ...formData });

      window.location.reload();
    } catch {
      alert("Houve um erro ao publicar seu link");
      isLoading.placeholder = "Publish";
      isLoading.disabled = false;
      setIsLoading({ ...isLoading });
    }
  };

  return (
    <NewPostContainer>
      <PictureContainer>
        <img src={user.pictureURL} alt="profile-pic" />
      </PictureContainer>
      <InputsContainer>
        <span>What are you going to share today?</span>
        <form onSubmit={handleSubmit}>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            disabled={isLoading.disabled && "disabled"}
            placeholder="http://..."
            required
          ></input>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            disabled={isLoading.disabled && "disabled"}
            placeholder="Awesome article about #javascript"
          ></input>
          <button type="submit" disabled={isLoading.disabled && "disabled"}>
            {isLoading.placeholder}
          </button>
        </form>
      </InputsContainer>
    </NewPostContainer>
  );
};

export default HomePage;
