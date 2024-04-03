import React from 'react';
import Button from '../Button';
import { HeaderWrapper } from './styled';

function Header() {
    
  return (
    <HeaderWrapper>
      <div>
        <Button color="#58d2fe" context='Garage'/>
        <Button color="#f804c4" context='Winners'/>
      </div>

      </HeaderWrapper>
  );
}

export default Header;

