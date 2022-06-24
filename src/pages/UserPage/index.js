import { useState, useEffect, useContext } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useParams } from "react-router-dom";

import Header from "../../components/Header";
import LoadingMorePost from "../../components/LoadingMorePost";
import Post from "../../components/Post";
import Trending from "../../components/Trending";
import TokenContext from "../../contexts/TokenContext";
import UserContext from "../../contexts/UserContext";
import { getUserPosts, followUser, unfollowUser } from "../../services/api";
import { Main, Container, UserTitle, Message } from "./style";

export default function UserPage() {
  const { token } = useContext(TokenContext);
  const { user } = useContext(UserContext);
  return (
    <>
      <Header />
      <Container>
        <Main>
          <UserPosts token={token} user={user} />
        </Main>
      </Container>
    </>
  );
}

const UserPosts = ({ token, user }) => {
  const [userData, setUserData] = useState(null);
  const [follow, setFollow] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMorePost, setHasMorePosts] = useState(true);
  const { id: userId } = useParams();

  useEffect(() => {
    const promise = getUserPosts(userId, offset, token);
    promise.then((res) => {
      setUserData(res.data);
      setFollow(res.data.follow);
      if (res.data.posts.length < 10) {
        setHasMorePosts(false);
      }
    });
    promise.catch((e) => {
      console.log(e);
      alert(
        "An error occured while trying to fetch the user's posts, please refresh the page."
      );
    });
  }, [userId]);

  if (!userData) {
    return (
      <section>
        <Message>Loading...</Message>
      </section>
    );
  }

  function formatUserName(username) {
    const lastLetter = username.slice(-1);
    if (lastLetter === "s") {
      return `${username}'`;
    }

    return `${username}'s`;
  }

  const title = `${formatUserName(userData.name)} posts`;
  const photo = userData.userPhoto;

  function toggleFollow() {
    const promise = getUserPosts(userId, token);
    promise.then((res) => {
      setUserData(res.data);
      setFollow(res.data.follow);
    });
    promise.catch((e) => {
      console.log(e);
      alert(
        "An error occured while trying to fetch the user's posts, please refresh the page."
      );
    });

    if (follow === true) {
      const promise = unfollowUser({ unfollowUserId: userId }, token);
      promise.then((res) => {
        setFollow(!follow);
      });
      promise.catch((e) => {
        console.log(e);
        alert("Ops! Não foi possível executar a operação.");
      });
    }
    if (follow === false) {
      const promise = followUser({ followUserId: userId }, token);
      promise.then((res) => {
        setFollow(!follow);
      });
      promise.catch((e) => {
        console.log(e);
        alert("Ops! Não foi possível executar a operação.");
      });
    }
  }

  if (!userData.posts.length) {
    return (
      <>
        <div className="name-container">
          <UserTitle>
            <img src={photo} alt="user's photo" />
            <h2>{title}</h2>
          </UserTitle>
          {parseInt(user.id) === parseInt(userId) ? (
            <></>
          ) : (
            <button
              onClick={() => toggleFollow()}
              className="follow"
              disabled={follow === null ? true : false}
              style={{
                background: follow === true ? "#FFFFFF" : "#1877f2",
                color: follow === false ? "#FFFFFF" : "#1877f2",
              }}
            >
              {follow ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
        <section>
          <Message>There are no posts yet</Message>
          <Trending />
        </section>
      </>
    );
  }

  function getMorePosts() {
    const promise = getUserPosts(userId, offset + 1, token);
    promise.then((res) => {
      const newPosts = res.data.posts;
      const updatedPosts = [...userData.posts, ...newPosts];
      const updateUser = {...userData, posts: updatedPosts};
      setUserData(updateUser);
      setOffset(offset + 1);
      if (newPosts.length < 10) {
        setHasMorePosts(false);
      }
    });
    promise.catch((e) => {
      console.log(e);
      alert(
        "An error occured while trying to fetch the user's posts, please refresh the page."
      );
    });
  }

  return (
    <>
      <div className="name-container">
        <UserTitle>
          <img src={photo} alt="user's photo" />
          <h2>{title}</h2>
        </UserTitle>
        {parseInt(user.id) === parseInt(userId) ? (
          <></>
        ) : (
          <button
            onClick={() => toggleFollow()}
            className="follow"
            disabled={follow === null ? true : false}
            style={{
              background: follow === true ? "#FFFFFF" : "#1877f2",
              color: follow === false ? "#FFFFFF" : "#1877f2",
            }}
          >
            {follow ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>
      <section>
        <InfiniteScroll
          pageStart={0}
          loadMore={() => { setTimeout(getMorePosts, 2000) }}
          hasMore={hasMorePost}
          loader={<LoadingMorePost />}
            >
            <div className="posts">
              {userData.posts.map((post, index) => (
                <Post post={post} key={index} />
              ))}
            </div>
        </InfiniteScroll>
      <Trending />
    </section>
    </>
  );
};
