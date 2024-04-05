import React from 'react';
import Header from './components/Header/Header';
import { useSelector } from 'react-redux';
import { State } from './index';
import Garage from './pages/Garage';
import { Wrapper } from './styled';
import Winners from './pages/Winners';


function App() {
  const selected = useSelector((state:State) => state.selected);

  return (
    <>
    <Header/>
    <Wrapper>
      {selected === "GARAGE" ?
      <Garage/> : <Winners/>}
    </Wrapper>
    </>
  );
}

export default App;
