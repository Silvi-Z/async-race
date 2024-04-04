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
  onClick?: any;
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ context, color, size, type, onClick, disabled }) => {
  const dispatch = useDispatch();
  
  const handleClick: ClickHandler = () => {
    !type && dispatch({ type: "CURRENT_PAGE", val:context})
  };

  return (
    <ButtonWrapper disabled={disabled} type={type} onClick={onClick || handleClick} color={color} size={size}>{context}</ButtonWrapper>
  );
}

export default Button;