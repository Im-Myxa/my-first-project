import React from 'react';
import Wrapper from './components/wrapper';
import NavBar from './NavBar';
import { useRoutes } from 'react-router-dom';
import routes from './routes';

function App() {
  const element = useRoutes(routes());

  return (
    <Wrapper>
      <NavBar />
      <div className='mt-6'>{element}</div>
    </Wrapper>
  );
}

export default App;
