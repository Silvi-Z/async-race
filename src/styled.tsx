import styled from "styled-components";
import start from "./assets/start.png";
import finish from "./assets/finish.png"

type StyledProps = {
    speed?: number,
    size?:string,
    drive?: boolean
}

export const Wrapper = styled.main`
    max-width: 1200px;
    margin: 0 auto;
    padding: 50px;
    @media (max-width: 750px) {
        padding: 30px;
    }
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
    @media (max-width: 1200px) {
        flex-wrap: wrap;
        gap: 30px;
        & > div {
            width: 45%;
            &: nth-child(2){
                justify-content: flex-end;
            }
        }
    }
`;

export const Race = styled.li<StyledProps>`
    display: flex;
    align-items: center;
    font-size:30px;
    margin-top: 20px;
    & > div {
        display: flex;
        gap: 10px;
        width: 25%;
        > div{
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        @media (max-width: 1200px) {
            flex-direction: column;
            > div {
                width: 50%;
            }
        }
        @media (max-width: 1000px) {
            width: 40%
        }
    }
    @media (max-width: 750px){
        flex-wrap: wrap;
        position: relative;
        > div {
            width: 100%;
            flex-direction: row;
            > div {
                flex-direction: row;
            }
        }
        .test {
            left: -15px;
            top: 19px;
        }   
    }
    h5 {
        color: #e2e2e2;
        border-bottom : 1px solid #e2e2e2;
        width: 90%;
        padding: 20px;
        margin-right: 40px;
        margin-left: 50px;
        @media (max-width: 1200px) {
            font-size: 20px;
        }
        @media (max-width: 750px){
            width: 100%;
            margin-left: 20%;
        }
    }
    .test {
        width: 90%;
        position: absolute;
        right: -10px;
    }
    .test > * {
        animation: ${props=> props.speed && `${props.speed}s forwards in-out`} ;
        animation-play-state: ${props=> !props.drive && `paused`};
        height: 50px;
        transition: 1s;
        animation-timing-function: linear;
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
    left: 20%;
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
@media (max-width: 750px){
    &:before {
        content: unset
    }
}
`;

export const NeonText = styled.span<StyledProps>`
    color: ${props=> props.color};
    text-shadow: 0 0 7px #ff7de3,
                 0 0 10px #ff7de3,
                 0 0 21px #ff7de3,
                 0 0 42px #fff;
    font-size: ${props=> props.size || '20px'};
`
