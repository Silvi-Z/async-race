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
}

const Button: React.FC<ButtonProps> = ({ context, color, size }) => {
  const dispatch = useDispatch();
  
  const handleClick: ClickHandler = () => {
    dispatch({ type: "CURRENT_PAGE", val:context})
  };

  return (
    <ButtonWrapper onClick={handleClick} color={color} size={size}>{context}</ButtonWrapper>
  );
}

export default Button;