import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMaster } from '../../../../store/features/master/masterSlice';
import MasterCard from '../../../../components/masterCard';

const GetAllMasters = ({ onShow }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMaster());
  }, []);

  const { masters, loading, status } = useSelector(state => state.master);

  if (!masters) {
    return (
      <div className='items-center justify-center bg-white py-10 text-2xl text-main'>
        Список пуст!
      </div>
    );
  }

  return (
    <>
      {loading && status === 'pending' ? (
        <div className='content-center justify-center'>Загрузка...</div>
      ) : (
        <div className='my-4 w-full space-y-8'>
          {masters.map(master => {
            return (
              <MasterCard key={master._id} master={master} onShow={onShow} />
            );
          })}
        </div>
      )}
    </>
  );
};

GetAllMasters.propTypes = {
  onShow: PropTypes.func
};

export default GetAllMasters;
