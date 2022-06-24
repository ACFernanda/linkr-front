import styled from "styled-components";
import { deletePost } from "../services/api";
import TokenContext from "../contexts/TokenContext";
import { useContext, useState } from "react";

export default function DeleteModal({ postId, setDeleting, setError }) {
    const { token } = useContext(TokenContext);
    const [loading,setLoading]=useState(false)
    return (
        <Overlay>
            {loading?
            <Content>
                <h1>Loading...</h1>
            </Content>
            :
            <Content>
                <h1>Are you sure you want to delete this post?</h1>
                <div>
                    <ButtonNo onClick={()=>setDeleting(false)}><p>No, go back</p></ButtonNo>
                    <ButtonYes onClick={async()=>{
                        try{
                            setLoading(true)
                            await deletePost(postId,token)
                            setDeleting(false)
                            setLoading(false)
                            window.location.reload();
                        }catch(e){
                            setError('It was not possible to delete the post')
                            setTimeout(() => setError(''), 4000)
                            console.log(e)
                            setDeleting(false)
                        }
                    }}><p>Yes, delete it</p></ButtonYes>
                </div>
            </Content>}

        </Overlay>
    )
}

const Overlay = styled.div`
    position:fixed;z-index:3;
    top:0;left:0;
    width:100vw;
    height:100vw;
    background-color: rgba(255, 255, 255, 0.6);
`;

const Content = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-evenly;
    position: fixed;z-index:4;
    width: 597px;
    height: 262px;
    left: calc(50% - 300px);
    top: calc(50% - 130px);
    background-color: #333333;
    border-radius: 50px;
    padding:0 110px 0 110px;
    h1{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 34px;
        line-height: 41px;
        text-align: center;
    }
    p{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
    }
`;

const ButtonNo = styled.button`
    color:#1877F2;
    background-color: #FFFFFF;
    width: 134px;
    height: 37px;
    border-radius: 5px;
    border:0;
    margin-right:20px;
`;

const ButtonYes = styled.button`
    color:#FFFFFF;
    background-color:#1877F2;
    width: 134px;
    height: 37px;
    border-radius: 5px;
    border:0;
`;