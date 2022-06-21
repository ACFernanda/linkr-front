import styled from "styled-components";

const ContentRP = styled.main`
    & {
        height: 100vh;
        width: 100vh;
        min-width: 100vw;
        background-color: #000;
        display: flex;

        @media (max-width: 613px){
            display: flex;
            flex-direction: column;
        }
    }
`;
export { ContentRP };