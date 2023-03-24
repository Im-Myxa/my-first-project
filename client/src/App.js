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
  const msgCategory = useSelector(state => state.category.message);
  const msgProduct = useSelector(state => state.product.message);
  const msgMaster = useSelector(state => state.master.message);
  const msgService = useSelector(state => state.service.message);
  const msgAuth = useSelector(state => state.auth.message);
  const msgUser = useSelector(state => state.user.message);

  useEffect(() => {
    dispatch(tokenIsValid());
  }, []);

  useEffect(() => {
    toast.info(msgProduct);
  }, [msgProduct]);

  useEffect(() => {
    toast.info(msgCategory);
  }, [msgCategory]);

  useEffect(() => {
    toast.info(msgMaster);
  }, [msgMaster]);

  useEffect(() => {
    toast.info(msgService);
  }, [msgService]);

  useEffect(() => {
    toast.info(msgAuth);
  }, [msgAuth]);

  useEffect(() => {
    toast.info(msgUser);
  }, [msgUser]);

  return (
    <Wrapper>
      <>
        <NavBar />
        <div>{element}</div>
        <ToastContainer position='bottom-right' />
      </>
    </Wrapper>
  );
}

export default App;
