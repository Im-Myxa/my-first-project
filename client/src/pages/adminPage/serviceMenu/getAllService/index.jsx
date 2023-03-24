import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getAllServices } from '../../../../store/features/service/serviceSlice';
import ServiceCard from '../../../../components/ServiceCard';

const GetAllService = ({ onShow }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllServices());
  }, []);

  const { services, loading, status } = useSelector(state => state.service);

  if (!services) {
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
        <div className='my-4 grid grid-cols-4 gap-8'>
          {services.map(service => {
            return (
              <ServiceCard
                key={service._id}
                service={service}
                onShow={onShow}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

GetAllService.propTypes = {
  onShow: PropTypes.func
};

export default GetAllService;
