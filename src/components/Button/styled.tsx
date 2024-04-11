import styled from "styled-components";

interface ButtonProps {
    color: string;
    size?: string;
  }
  
  export const ButtonWrapper = styled.button<ButtonProps>`
    padding: ${props=> props.size === "big" ? "10px 15px" : "5px"};
    opacity: ${props=> props.disabled && '.4'};
    font-size: ${props=> props.size === "big" ? "20PX" : "14px"};
    border-radius: 5px;
    cursor: pointer;
    background-color: transparent;
    color: ${props=> props.color};
    border: 2px solid ${props=> props.color};
`;