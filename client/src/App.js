import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Wrapper from './components/wrapper';
import NavBar from '../src/components/NavBar';
import routes from './routes';
import { useDispatch, useSelector } from 'react-redux';
import { tokenIsValid } from './store/features/auth/authSlice';

function App() {
  const element = useRoutes(routes());
  const dispatch = useDispatch();
  const { message } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(tokenIsValid());
  }, []);

  useEffect(() => {
    toast.info(message);
  }, [message]);

  return (
    <Wrapper>
      <>
        <NavBar />
        <div className='mt-6'>{element}</div>
        <ToastContainer position='bottom-right' />
      </>
    </Wrapper>
  );
}

export default App;
