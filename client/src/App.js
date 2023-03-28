import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from '../src/components/NavBar';
import routes from './routes';
import { useSelector } from 'react-redux';

function App() {
  const element = useRoutes(routes());
  const msgCategory = useSelector(state => state.category.message);
  const msgProduct = useSelector(state => state.product.message);
  const msgMaster = useSelector(state => state.master.message);
  const msgService = useSelector(state => state.service.message);
  const msgUser = useSelector(state => state.user.message);
  const msgOrder = useSelector(state => state.order.message);

  useEffect(() => {
    toast.info(msgOrder);
  }, [msgOrder]);

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
    toast.info(msgUser);
  }, [msgUser]);

  return (
    <>
      <NavBar />
      <div>{element}</div>
      <ToastContainer position='bottom-right' />
    </>
  );
}

export default App;
