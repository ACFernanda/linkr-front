import styled from "styled-components";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import { IconContext } from "react-icons";

export default function LoadingMorePost() {
    return (
        <Content>
            <IconContext.Provider value={{className: "react-icon"}}>
                <AiOutlineLoading3Quarters />
            </IconContext.Provider>
            <p>Loading more posts...</p>
        </Content>
    )
}

const Content = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 80px;
    margin-bottom: 80px;
    p {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 22px;
        line-height: 26px;
        letter-spacing: 0.05em;

        color: #6D6D6D;
    }

    .react-icon {
        font-size: 36px;
        color: #6D6D6D;
        margin-bottom: 15px;
    }
`;