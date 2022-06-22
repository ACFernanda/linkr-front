import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IconContext } from "react-icons";
import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import { dislikePost, likePost } from "../services/api";
import UserContext from "./../contexts/UserContext.js";
import TokenContext from "../contexts/TokenContext";

export default function Post({ post }) {
  const { user } = useContext(UserContext);
  const { token } = useContext(TokenContext);

  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState([]);
  const [countLikes, setCountLikes] = useState(0);
  const [tooltip, setTooltip] = useState("");

  useEffect(() => {
    setLike(post.likedByUser);
    setLikes(post.likes);
    setCountLikes(Number(post.countLikes));
    setTooltip("");
    console.log("Rendezirando post!");
  }, [post])

  useEffect(() => {
    const usernameIndex = likes.indexOf(user.username);
    if (usernameIndex !== -1) {
      const likesAux = [...likes];
      likesAux.splice(usernameIndex, 1);
      likesAux.unshift("You");
      setLikes(likesAux);
    }
  }, [likes]);

  useEffect(() => {
    setTooltip(configureTooltip());
  }, [likes])

  function readHashtags(word, index) {
    if (word[0] === "#") {
      return (
        <Link key={index} to={`/hashtag/${word.replace("#", "")}`}>
          <Hashtag key={index}
            className="hashtag"
          >
            {word}
          </Hashtag>
        </Link>
      );
    } else {
      return <span>{word}</span>;
    }
  }

  const newList = [];
  const oldList = post.description.split(" ");
  for (let k = 0; k < oldList.length; k++) {
    newList.push(oldList[k]);
    if (k !== oldList.length - 1) {
      newList.push(" ");
    }
  }

  function likeAndDislike() {
    if (like === true) {
      dislikePost({ postId: post.postId }, token);
      setCountLikes(Number(countLikes) - 1);
      const newLikes = likes.slice(1);
      setLikes(newLikes);
    }
    if (like === false) {
      likePost({ postId: post.postId }, token);
      setCountLikes(Number(countLikes) + 1);
      const newLikes = ["You", ...likes];
      setLikes(newLikes);
    }
    setLike(!like);
  }

  function configureTooltip() {
    let tooltipText = "";
    if (countLikes === 0) {
      tooltipText = "Noboby liked";
    }
    else if (countLikes === 1) {
      tooltipText = likes[0];
    }
    else if (countLikes === 2) {
      tooltipText = likes.join(' and ');
    }
    else {
      const otherPeople = countLikes - 2;
      tooltipText = `${likes[0]}, ${likes[1]} and other ${otherPeople} people`;
    }

    return tooltipText;
  }

  return (
    <PostContainer key={post.postId}>
      <PictureContainer countLikes={countLikes}>
        <img src={post.pictureURL} alt="" />
        <IconContext.Provider value={{ className: "react-icons" }}>
          <button onClick={likeAndDislike}>
            {like === false ? (
              <AiOutlineHeart />
            ) : (
              <AiFillHeart style={{ color: "#AC0000" }} />
            )}
          </button>
        </IconContext.Provider>
        <ReactTooltip place="bottom" type="light" effect="solid" />
        {Number(countLikes) === 1 ? (
          <p data-tip={tooltip}>{countLikes} like</p>
        ) : (
          <p data-tip={tooltip}>{countLikes} likes</p>
        )}
      </PictureContainer>
      <ContentContainer>
        <Link to={`/user/${post.userId}`}>
          <p className="username">{post.username}</p>
        </Link>
        <p className="description">{newList.map(readHashtags)}</p>
        <SnippetContainer
          onClick={() => window.open(post.url, "_blank").focus()}
        >
          <InfoContainer>
            <p className="title">{post.urlTitle}</p>
            <p className="url-description">{post.urlDescription}</p>
            <a
              href={post.url}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              {post.url}
            </a>
          </InfoContainer>
          <ImageContainer urlImage={post.urlImage}></ImageContainer>
        </SnippetContainer>
      </ContentContainer>
    </PostContainer>
  );
}

const PostContainer = styled.div`
  padding: 12px;
  width: 100%;
  background-color: #171717;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  margin: 12px 0 10px 0;
  @media (max-width: 613px) {
    border-radius: 0;
  }
`;

const PictureContainer = styled.div`
  display: flex;
  flex-direction: column;
  img {
    height: 50px;
    border-radius: 50%;
  }
  button {
    margin-top: 12px;
    background-color: #171717;
    color: #ffffff;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
  p {
    color: #ffffff;
    font-family: "Lato";
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
  }
`;

const ContentContainer = styled.div`
  font-family: "Lato";
  width: 100%;
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  p.username {
    font-weight: 400;
    font-size: 19px;
    color: #ffffff;
    margin-bottom: 8px;
    @media (max-width: 613px) {
      font-size: 17px;
      line-height: 20px;
    }
  }
  p.description {
    font-weight: 400;
    font-size: 17px;
    color: #b7b7b7;
    margin-bottom: 10px;
    @media (max-width: 613px) {
      font-size: 15px;
      line-height: 18px;
    }
  }
  .hashtag {
    font-weight: 900;
  }
`;

const SnippetContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #4d4d4d;
  border-radius: 11px;
`;

const InfoContainer = styled.div`
  width: 100%;
  padding: 10px 0 8px 10px;
  p.title {
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    margin-bottom: 5px;
    color: #cecece;
    @media (max-width: 613px) {
      font-size: 11px;
      line-height: 13px;
    }
  }
  p.url-description {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #9b9595;
    margin-bottom: 8px;
    @media (max-width: 613px) {
      font-size: 9px;
      line-height: 11px;
    }
  }
  a {
    color: #ffffff;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #cecece;
    text-decoration: none;
    @media (max-width: 613px) {
      font-size: 9px;
      line-height: 11px;
    }
  }
`;

const ImageContainer = styled.div`
  width: 50%;
  border-radius: 0px 12px 13px 0px;
  background-image: url(${(props) => props.urlImage});
  background-position: center;
  background-size: cover;
  margin-left: 7px;
`;

const Hashtag = styled.span`
   color: "#ffffff";
   font-weight: 700;
`;
