import styled from "styled-components";

export default function Outdoor() {
    return (
        <LeftSide>
            <div>
                <h1>linkr</h1>
                <div>
                    <h2>save, share and discover the best links on the web</h2>
                </div>
            </div>
        </LeftSide>
    )
}

const LeftSide = styled.section`
    & {
        display: flex;
        height: 100vh;
        width: calc(100% - 40vw);
        left: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: left;
        background-color: #151515;
        box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);

        @media (max-width: 613px) {
            height: 175px;
            width: 100vw;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            div{
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        }
    }
    h1 {
        width: 233px;
        height: 117px;
        font-family: 'Passion One';
        font-style: normal;
        font-weight: 700;
        font-size: 106px;
        line-height: 117px;
        letter-spacing: 0.05em;
        color: #FFFFFF;

        @media (max-width: 613px) {
            width: 167px;
            height: 84px;
            font-size: 76px;
            line-height: 84px;
            text-align: center;
        }
    }
    h2 {
        width: 442px;
        height: 60px;
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 43px;
        line-height: 63px;
        color: #FFFFFF;

        @media (max-width: 613px) {
            width: 237px;
            height: 68px;
            font-size: 23px;
            line-height: 34px;
            text-align: center;
        }
    }
`;