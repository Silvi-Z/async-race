import styled from "styled-components";

export const HeaderWrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 50px;
    display: flex;
    div {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    @media (max-width: 750px) {
        padding: 30px;
    }
`;