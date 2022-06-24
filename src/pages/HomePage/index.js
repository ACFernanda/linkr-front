import { useState, useEffect, useContext } from "react";
import { HiRefresh } from "react-icons/hi";

import Header from "../../components/Header";
import Post from "../../components/Post";
import Trending from "../../components/Trending";
import TokenContext from "../../contexts/TokenContext";
import UserContext from "../../contexts/UserContext";
import { getAllPosts, publishPost, getAllFollowing } from "../../services/api";
import {
  Main,
  Container,
  NewPostContainer,
  PictureContainer,
  InputsContainer,
  Message,
} from "./style";

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

let countOlderPosts;
let countNewPosts;
const RenderPosts = ({ token }) => {
  const [posts, setPosts] = useState();
  const [following, setFollowing] = useState();
  const [newPosts, setNewPosts] = useState();

  useEffect(() => {
    (() => {
      const followingResponse = getAllFollowing(token);
      followingResponse.then((res) => setFollowing(res.data));
      followingResponse.catch((e) =>
        alert(
          "An error occured while trying to fetch the posts, please refresh the page."
        )
      );
    })();
  }, []);

  useEffect(() => {
    function getPosts() {
      const postsResponse = getAllPosts(token);
      postsResponse.then((res) => {
        if (countOlderPosts && res.data.length > countOlderPosts) {
          setNewPosts(res.data);
          countNewPosts = res.data.length - countOlderPosts;
        } else {
          setPosts(res.data);
          countOlderPosts = res.data.length;
        }
      });
      postsResponse.catch((e) =>
        alert(
          "An error occured while trying to fetch the posts, please refresh the page."
        )
      );
    }
    getPosts();
    setInterval(getPosts, 15000);
  }, []);

  if (!posts || !following) return <Message>Loading...</Message>;

  if (!following.length)
    return (
      <Message>You don't follow anyone yet. Search for new friends!</Message>
    );

  if (!posts.length) return <Message>No posts found from your friends</Message>;

  return (
    <>
      {newPosts && posts && newPosts.length > posts.length ? (
        <button onClick={() => setPosts(newPosts)} className="new-posts">
          {newPosts.length - posts.length} new post(s), load more! <HiRefresh />
        </button>
      ) : (
        <></>
      )}
      {posts.map((post, index) => (
        <Post post={post} key={index} />
      ))}
    </>
  );
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
