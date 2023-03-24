import React, { useState } from 'react';

import CreateService from './createService';
import EditService from './editService';
import GetAllService from './getAllService';

const ServiceMenu = () => {
  const [show, setShow] = useState(false);
  const [showEditService, setShowEditService] = useState(false);
  return (
    <div className='w-4/5'>
      <div className='flex items-center gap-6 border-b border-main/[0.2] py-2 text-2xl'>
        <h2 className='font-bold'>Услуги</h2>
        <button
          className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full hover:bg-main/[0.1]'
          onClick={() => setShow(true)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </button>
      </div>

      {show && <CreateService onHide={() => setShow(false)} />}
      {showEditService.status === true && (
        <EditService
          onHide={() => setShowEditService(false)}
          show={showEditService}
        />
      )}
      <div>
        <GetAllService onShow={setShowEditService} />
      </div>
    </div>
  );
};

export default ServiceMenu;
