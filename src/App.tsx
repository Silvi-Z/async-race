import React from 'react';
import Header from './components/Header/Header';
import { useSelector } from 'react-redux';
import { State } from './index';
import Garage from './components/Garage';
import { Wrapper } from './styled';


function App() {
  const selected = useSelector((state:State) => state.selected);

  return (
    <>
    <Header/>
    
    <Wrapper>
      {selected === "GARAGE" ?
      <Garage/> : 'winners'}
    </Wrapper>
    </>
  );
}

export default App;
