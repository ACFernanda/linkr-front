import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart, AiFillDelete, AiFillEdit, AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai";
import { IconContext } from "react-icons";
import styled from "styled-components";
import { useState, useContext, useEffect, useRef } from "react";
import ReactTooltip from "react-tooltip";
import { dislikePost, editPost, likePost } from "../services/api";
import { getTrandings } from "../services/api";

import UserContext from "./../contexts/UserContext.js";
import TokenContext from "../contexts/TokenContext";
import Shared from './Shared'
import ShareModal from './ShareModal'
import DeleteModal from "./DeleteModal";
import Comments from './Comments';

import TrendingContext from "../contexts/TrendingContext";



export default function Post({ post }) {
  const { user } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const { setTrendingList } = useContext(TrendingContext);

  const inputRef = useRef();
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [input, setInput] = useState('');
  const [descriptionList, setDescriptionList] = useState([]);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [error, setError] = useState('');

  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState([]);
  const [countLikes, setCountLikes] = useState(0);
  const [tooltip, setTooltip] = useState("");
  const [countComments, setCountComments] = useState(0);
  const [countShares, setCountShares] = useState(0);
  const [commenting, setCommenting] = useState(false)
  const [sharing, setSharing] = useState(false)

  const owner = user.id === post.userId;

  useEffect(() => {
    setLike(post.likedByUser);
    setLikes(post.likes);
    setInput(post.description);
    setCountLikes(Number(post.countLikes));
    setCountComments(Number(post.countComments));
    setCountShares(Number(post.countShares))
    setTooltip("");
    setCommenting(false);
    setEditing(false);
    setDeleting(false);
    setDescriptionList([]);
    setInputDisabled(false);
    setError('');
  }, [post]);


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
  }, [likes]);

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

  function defineDescriptionList(frase) {
    const newList = [];
    const oldList = frase.split(" ");
    for (let k = 0; k < oldList.length; k++) {
      newList.push(oldList[k]);
      if (k !== oldList.length - 1) {
        newList.push(" ");
      }
    }
    setDescriptionList(newList);
  }

  async function prepareToEdit() {
    try {
      setInputDisabled(true);
      await editPost(post.postId, { description: input }, token);
      setEditing(false);
      setInputDisabled(false);
      defineDescriptionList(input);
      searchTrendings()
      //window.location.reload();
    } catch (e) {
      console.log(e);
      setInputDisabled(false);
      setError('It was not possible to edit the post');
      setTimeout(() => setError(''), 4000);
    }
  };

  async function searchTrendings(){
    const response = await getTrandings(token);
    setTrendingList(response.data);
  }

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
      setInput(descriptionList.join(''));
    }
  }, [editing]);

  function inputHandler(event) {
    const key = event.code;
    if (key === "Enter") {
      console.log('input após o enter:', input);
      prepareToEdit();
    }
    else if (key === "Escape") {
      setEditing(false);
    }
  }

  useEffect(() => {
    defineDescriptionList(post.description);
  }, [post]);

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

  function updateCountComments() {
    setCountComments(countComments + 1);
  }

  return (
    <>
      {sharing?
      <ShareModal postId={post.postId} setSharing={setSharing} setError={setError} />
      :<></>}
      {post.reposterId ?
      <Shared reposterId={post.reposterId} reposterName={post.reposterName} /> 
      : <></>}
      <PostContainer key={post.postId}>
        <IconContext.Provider value={{ className: "react-icons" }}>
          {deleting ? <DeleteModal setError={setError} postId={post.postId} setDeleting={setDeleting} /> : <></>}
          {error !== '' ? <ErrorMessage><p>{error}</p></ErrorMessage> : <></>}

          <PictureContainer countLikes={countLikes}>
            <img src={post.pictureURL} alt="" />
            <button onClick={likeAndDislike}>
              {like === false ? (
                <AiOutlineHeart />
              ) : (
                <AiFillHeart style={{ color: "#AC0000" }} />
              )}
            </button>
            <ReactTooltip place="bottom" type="light" effect="solid" />
            {Number(countLikes) === 1 ? (
              <p data-tip={tooltip}>{countLikes} like</p>
            ) : (
              <p data-tip={tooltip}>{countLikes} likes</p>
            )}

            <button onClick={() => setCommenting(!commenting)}>
              <AiOutlineComment />
            </button>
            {countComments === 1 ? (
              <p >{countComments} comment</p>
            ) : (
              <p >{countComments} comments</p>
            )}
            <button onClick={() => setSharing(true)}>
              <AiOutlineShareAlt />
            </button>
            {countShares === 1 ? (
              <p >{countShares} re-post</p>
            ) : (
              <p >{countShares} re-posts</p>
            )}
          </PictureContainer>
          <ContentContainer>
            <FirstLine>
              <Link to={`/user/${post.userId}`}>
                <p className="username">{post.username}</p>
              </Link>
              <span>
                {owner ?
                  <button onClick={() => { setEditing(!editing) }}>
                    <AiFillEdit />
                  </button>
                  : <></>}
                {owner ?
                  <button onClick={() => setDeleting(true)}>
                    <AiFillDelete />
                  </button>
                  : <></>}
              </span>
            </FirstLine>

            {editing ?
              <input
                ref={inputRef}
                value={input}
                onChange={e => { setInput(e.target.value); console.log(input) }}
                onKeyDown={inputHandler}
                disabled={inputDisabled ? true : false}>
              </input>
              :
              <p className="description">{descriptionList.map(readHashtags)}</p>
            }
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
        </IconContext.Provider>
      </PostContainer>
      {commenting ? <Comments post={post} updateCountComents={updateCountComments} /> : <></>}
    </>
  );
}

const ErrorMessage = styled.div`
  position:absolute;
  top:-19px;right:0;
  p{
    color: orange;
      font-family: "Lato";
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      text-align: center;
  }
`;

const FirstLine = styled.div`
  width:100%;
  display:flex;justify-content:space-between;
  button {
    background-color: #171717;
    color: #ffffff;
    border: none;
    font-size: 20px;
  }
`;

const PostContainer = styled.div`
  position:relative;
  padding: 12px;
  width: 100%;
  background-color: #171717;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  margin: 12px 0 10px 0;
  position:relative;
  @media (max-width: 613px) {
    border-radius: 0;
  };

  .react-icons {
    cursor: pointer;
  };
`;

const PictureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    height: 50px;
    border-radius: 50%;
    max-width: 50px;
    object-fit:cover;
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
    width: max-content;
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
  input{
    padding-left:9px;
    border:0;
    width: 100%;
    height: 44px;
    border-radius:10px;
    margin-bottom:12px;

    :disabled {
      background-color: lightgray;
    }
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
