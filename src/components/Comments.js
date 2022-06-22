import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import { getTrandings } from "../services/api";
import TokenContext from "../contexts/TokenContext";
export default function Comments({postId}) {
  const { token } = useContext(TokenContext);
  const [commentList, setCommentList] = useState([]);
  /* function renderTrendings(item) {
    return (
      <Link to={`/hashtag/${item.name}`}>
        <p>#{item.name}</p>
      </Link>
    );
  }
  useEffect(() => {}, []); */
  return (
    <Container>
    </Container>
  );
}
const Container=styled.div`

width: 100%;
height: 100px;
margin:-30px 0 10px 0;
background-color: #1E1E1E;
border-radius: 16px;
`