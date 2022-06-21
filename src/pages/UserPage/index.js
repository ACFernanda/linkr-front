import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import Header from "../../components/Header";
import Post from "../../components/Post";
import Trending from "../../components/Trending";
import TokenContext from "../../contexts/TokenContext";
import UserContext from "../../contexts/UserContext";
import { getUserPosts } from "../../services/api";
import { Main, Container, Message } from "./style";

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
  const { id: userId } = useParams();
  console.log(userId, user.id);

  useEffect(() => {
    const promise = getUserPosts(userId, token);
    promise.then((res) => setUserData(res.data));
    promise.catch((e) =>
      alert(
        "An error occured while trying to fetch the user's posts, please refresh the page."
      )
    );
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

  if (!userData.posts.length) {
    return (
      <>
        <div className="name-container">
          <h2>{title}</h2>
          {parseInt(user.id) === parseInt(userId) ? (
            <></>
          ) : (
            <button className="follow">Follow</button>
          )}
        </div>
        <section>
          <Message>There are no posts yet</Message>
          <Trending />
        </section>
      </>
    );
  }

  return (
    <>
      <div className="name-container">
        <h2>{title}</h2>
        {parseInt(user.id) === parseInt(userId) ? (
          <></>
        ) : (
          <button className="follow">Follow</button>
        )}
      </div>
      <section>
        <div className="posts">
          {userData.posts.map((post, index) => (
            <Post post={post} key={index} />
          ))}
        </div>
        <Trending />
      </section>
    </>
  );
};
