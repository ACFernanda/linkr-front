import styled from "styled-components"
import { Link } from 'react-router-dom'
import { useContext } from "react";

import UserContext from "./../contexts/UserContext.js";


export default function Shared({reposterId,reposterName}){
    const { user } = useContext(UserContext);
    const myShare=(reposterId==user.id)
    return(
        <Container>
            <div>
                <h1>Re-Posted by 
                    <Link to={`/user/${reposterId}`}>
                        <span> {myShare?'you':reposterName}</span>
                    </Link>
                </h1>
            </div>
        </Container>
    )
}
const Container=styled.div`
width: 100%;height:63px;
margin: 15px 0 -35px 0;
background-color: #1E1E1E;
border-radius: 16px;
padding:15px;
h1{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #FFFFFF;
}
span{
    font-weight: 700;
}
`