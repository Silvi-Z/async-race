import styled from "styled-components";

export const ButtonWrapper = styled.button`
    padding: 10px 15px;
    font-size: 20px;
    border-radius: 5px;
    background-color: transparent;
    color: ${props=> props.color};
    border: 2px solid ${props=> props.color};
`;