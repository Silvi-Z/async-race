import styled from "styled-components";
import start from "./assets/start.png";
import finish from "./assets/finish.png"

export const Wrapper = styled.main`
    max-width: 1200px;
    margin: 0 auto;
    padding: 50px;
`;

export const ControlLineWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > div {
        align-items: center;
        display: flex;
        gap: 10px;
    }
`;

export const Race = styled.li`
    display: flex;
    align-items: center;
    font-size:30px;
    gap: 50px;
    margin-top: 20px;
    & > div {
        display: flex;
        gap: 10px;
        width: 17%;
        > div{
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
    }
    h5 {
        color: #e2e2e2;
        border-bottom : 1px solid #e2e2e2;
        width: 70%;
        padding: 20px;
    }
    .test {
        width: 90%;
        position: absolute;
        right: 0;
    }
    img {
        // animation: 5s in-out ;
        height: 50px;
        width: fit-content;
        position: absolute;
        left: 0;
    }
    @keyframes in-out {
        0% {
            left: 0;
        }
        100% {
            left: 90%;
        }
      }
`;

export const Races = styled.ul`
position: relative;
margin-bottom: 30px;
&:before {
    background-image: url(${start});
    left: 200px;
}
&:before, &:after {
    content: "";
    background-position: center;
    position: absolute;
    top: 0;
    height: 100%;
    width: 30px;
}
&:after {
    background-image: url(${finish});
    right: 0;
}
`;

export const NeonText = styled.span`
    color: #ff7de3;
    text-shadow: 0 0 7px #ff7de3,
                 0 0 10px #ff7de3,
                 0 0 21px #ff7de3,
                 0 0 42px #fff;
    font-size: 20px;
`
