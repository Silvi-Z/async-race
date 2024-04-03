import React from 'react';
import Button from '../Button';
import { HeaderWrapper } from './styled';

function Header() {
    
  return (
    <HeaderWrapper>
      <div>
        <Button size="big" color="#58d2fe" context='GARAGE'/>
        <Button size="big" color="#f804c4" context='WINNERS'/>
      </div>

      </HeaderWrapper>
  );
}

export default Header;

