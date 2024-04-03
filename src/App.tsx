import React from 'react';
import Header from './components/Header/Header';
import { useSelector } from 'react-redux';
import { State } from './index';


function App() {
  const selected = useSelector((state:State) => state.selected);

  return (
    <>
    <Header/>
    
    <main>
      {selected}
    </main>
    </>
  );
}

export default App;
