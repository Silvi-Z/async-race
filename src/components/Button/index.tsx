import React from 'react';
import { ButtonWrapper } from './styled';
import { useDispatch } from 'react-redux';

interface ClickHandler {
  (): void;
}

interface ButtonProps {
  context: string;
  color: string;
  size?: string;
  type?: any;
}

const Button: React.FC<ButtonProps> = ({ context, color, size, type }) => {
  const dispatch = useDispatch();
  
  const handleClick: ClickHandler = () => {
    !type && dispatch({ type: "CURRENT_PAGE", val:context})
  };

  return (
    <ButtonWrapper type={type} onClick={handleClick} color={color} size={size}>{context}</ButtonWrapper>
  );
}

export default Button;