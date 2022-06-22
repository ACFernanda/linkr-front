import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getComments, publishComment } from "../services/api";
import { IconContext } from "react-icons";
import TokenContext from "../contexts/TokenContext";
import UserContext from "./../contexts/UserContext.js";
import { AiOutlineSend } from "react-icons/ai";
export default function Comments({postId}) {
  const { token } = useContext(TokenContext);
  const { user } = useContext(UserContext);
  const [commentList, setCommentList] = useState([]);
  const [input,setInput]=useState('')
  async function sendComment(){
    const promise= publishComment(postId,{text:input},token)
    promise.then(()=>{
        searchComments()
        setInput('')
    })  
    promise.catch(e=>console.log(e))
  }
  async function searchComments(){
    const promise= getComments(postId,token)
    promise.then(res=>setCommentList(res.data))  
    promise.catch(e=>console.log(e))
    
  }
   function mapComments(comment) {
    const {pictureURL,userId,username,text}=comment
    return (
     <CommentContainer>
        <Comment>
            <img src={pictureURL} alt="" />
            <div>
                <Link to={`/user/${userId}`}>
                    <h4 className="username">{username}</h4>
                </Link>
                <p>{text}</p>
            </div>
        </Comment>
        <div className="divisory"></div>
     </CommentContainer>
    );
  }
  useEffect(() => {searchComments()}, []);
  return (
    <Container>
        <IconContext.Provider value={{ className: "react-icons" }}>
        <div className="emptySpace"></div>
        {commentList.map(mapComments)}
        <NewMessage>
            <img src={user.pictureURL} alt="" />
            <div>
                <input value={input}
                    onChange={e=>setInput(e.target.value)}
                    placeholder='write a comment...'
                ></input>
                <button onClick={sendComment}
                ><AiOutlineSend /></button>
            </div>
            
        </NewMessage>
        </IconContext.Provider>
    </Container>
  );
}
const CommentContainer=styled.div`
display:flex;
flex-direction:column;
align-items:center;
.divisory{
    background-color:#353535;
    height:1px;
    width:calc(100% - 40px)
}
`
const Comment=styled.div`
width:100%;padding:25px;
display:flex;align-items:center;
h4{
    font-family: 'Lato';
font-style: normal;
font-weight: 700;
font-size: 14px;
color: #F3F3F3;
margin-bottom:5px;
}
p{
    font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 17px;
color: #ACACAC;
}
div{height:39px}
`
const Container=styled.div`
width: 100%;
margin:-35px 0 10px 0;
background-color: #1E1E1E;
border-radius: 16px;
.emptySpace{height:26px;width:100%}
img {
    height: 39px;width: 39px;
    border-radius: 50%;
    margin-right:15px
  }
`
const NewMessage=styled.div`
width:100%;padding:25px;
display:flex;align-items:center;justify-content:space-between;
input{
    width: 100% ;
    height: 100%;
    border:0;
    background-color: #252525;
    border-radius: 8px;
    color:white;
    padding:5px
}
button{
    position:absolute;right:0;top:7px;
    background-color: #252525;
    color: #ffffff;
    border: none;
    font-size: 20px;

}
div{
    position:relative;
    width: calc(100% - 50px);
    height: 39px;
}
`