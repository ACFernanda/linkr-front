import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IconContext } from "react-icons";
import styled from "styled-components";
import { useState, useContext, useEffect , useRef} from "react";
import ReactTooltip from "react-tooltip";
import { dislikePost, editPost, likePost } from "../services/api";
import UserContext from "./../contexts/UserContext.js";
import TokenContext from "../contexts/TokenContext";
import DeleteModal from "./DeleteModal";
export default function Post({ post }) {
  const { user } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const inputRef=useRef()
  const [like, setLike] = useState(false);
  const [countLikes, setCountLikes] = useState(post.countLikes);
  const [tooltip, setTooltip] = useState(post.countLikes);
  const [editing,setEditing]=useState(false)
  const [deleting,setDeleting]=useState(false)
  const [input,setInput]=useState(post.description)
  const [descriptionList,setDescriptionList]=useState([])
  const owner=user.id===post.userId
  // useEffect(() => {
  //   let userLiked;
  //   if (post.likes.length) {
  //     userLiked = post.likes.find((item) => item.userId === user.id);
  //   }
  //   if (userLiked) {
  //     setLike(!like);
  //   }
  // }, []);

  function readHashtags(word) {
    if (word[0] === "#") {
      return (
        <Link to={`/hashtag/${word.replace("#", "")}`}>
          <span
            className="hashtag"
            style={{ color: "#ffffff", fontWeight: 700 }}
          >
            {word}
          </span>
        </Link>
      );
    } else {
      return <span>{word}</span>;
    }
  }
  function defineDescriptionList(frase){
    const newList = [];
    const oldList = frase.split(" ");
    for (let k = 0; k < oldList.length; k++) {
      newList.push(oldList[k]);
      if (k !== oldList.length - 1) {
        newList.push(" ");
      }
    }
    setDescriptionList(newList)
  }
  
  function editButton(){
    if(editing){
      const promise= editPost(post.postId,{description:input},token)
      promise.then(()=>defineDescriptionList(input))
    }
    setEditing(!editing)
    
  }

  useEffect(()=>{
    defineDescriptionList(post.description)
    
  },[])
  
  useEffect(()=>{
    if(editing)inputRef.current.focus()
  },[editing])
  // useEffect(() => {
  //   getTooltip();
  // }, []);

  // function getTooltip() {
  //   const likes = post.likes;
  //   if (likes.length) {
  //     const notUser = likes.filter((item) => item.id !== user.id);
  //     const namesNotUser = notUser.map((item) => item.username);
  //     if (likes.filter((item) => item.id === user.id).length > 0) {
  //       if (namesNotUser.length === 0) {
  //         setTooltip("You");
  //       }
  //       if (namesNotUser.length === 1) {
  //         setTooltip("You and " + namesNotUser[0]);
  //       } else if (namesNotUser.length === 2) {
  //         setTooltip("You, " + namesNotUser[0] + " and another person");
  //       } else if (namesNotUser.length > 2) {
  //         setTooltip(
  //           "You, " +
  //             namesNotUser[0] +
  //             " and " +
  //             (likes.length - 2) +
  //             " other people"
  //         );
  //       }
  //     } else {
  //       if (namesNotUser.length === 0) {
  //         setTooltip(null);
  //       }
  //       if (namesNotUser.length === 1) {
  //         setTooltip(namesNotUser[0]);
  //       } else if (namesNotUser.length === 2) {
  //         setTooltip(namesNotUser[0] + " e " + namesNotUser[1]);
  //       } else if (namesNotUser.length === 3) {
  //         setTooltip(
  //           namesNotUser[0] + ", " + namesNotUser[1] + ", and another person"
  //         );
  //       } else if (namesNotUser.length > 3) {
  //         setTooltip(
  //           namesNotUser[0] +
  //             ", " +
  //             namesNotUser[1] +
  //             ", and " +
  //             (likes.length - 2) +
  //             " other people"
  //         );
  //       }
  //     }
  //   }
  // }

  return (
    <PostContainer key={post.postId}>
      {deleting?<DeleteModal postId={post.postId} setDeleting={setDeleting} />:<></>}
      <IconContext.Provider value={{ className: "react-icons" }}>
      <PictureContainer countLikes={countLikes}>
        <img src={post.pictureURL} alt="" />
        
          <button
            onClick={() => {
              // getTooltip();
              if (like === true) {
                dislikePost({ postId: post.postId }, token);
                setCountLikes(Number(countLikes) - 1);
              }
              if (like === false) {
                likePost({ postId: post.postId }, token);
                setCountLikes(Number(countLikes) + 1);
              }
              setLike(!like);
            }}
          >
            {like === false ? (
              <AiOutlineHeart />
            ) : (
              <AiFillHeart style={{ color: "#AC0000" }} />
            )}
          </button>
        
        <ReactTooltip place="bottom" type="light" effect="solid" />
        {countLikes === 1 ? (
          <p data-tip={tooltip}>{countLikes} like</p>
        ) : (
          <p data-tip={tooltip}>{countLikes} likes</p>
        )}
      </PictureContainer>
      <ContentContainer>
        <FirstLine>
          <Link to={`/user/${post.userId}`}>
            <p className="username">{post.username}</p>
          </Link>
          <span>
            {owner?
              <button onClick={editButton}>
                editar
              </button>
            :<></>}
            {owner?
              <button onClick={()=>setDeleting(true)}>
                apagar
              </button>
            :<></>}
          </span>
          
        </FirstLine>
        <input ref={inputRef} className={editing?'normal':'invisible'} value={input} onChange={e=>setInput(e.target.value)}></input>
        {editing?
          <></>
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
  );
}
const FirstLine=styled.div`
width:100%;
display:flex;justify-content:space-between;
`

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
  input{
    padding-left:9px;
    border:0;
    width: 100%;
    height: 44px;
    border-radius:10px;
    margin-bottom:12px;
  }
  .invisible{display:none}
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
