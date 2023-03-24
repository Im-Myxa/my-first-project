import React, { useState } from 'react';

import CreateMaster from './createMaster';
import EditMaster from './editMaster';
import GetAllMasters from './getAllMasters';

const MasterMenu = () => {
  const [showCreateMaster, setShowCreateMaster] = useState(false);
  const [showEditMaster, setShowEditMaster] = useState(false);

  return (
    <div className='w-4/5'>
      <div className='flex items-center gap-6 border-b border-main/[0.2] py-2 text-2xl'>
        <h2 className='font-bold'>Мастера</h2>
        <button
          className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full hover:bg-main/[0.1]'
          onClick={() => setShowCreateMaster(true)}
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

      {showCreateMaster && (
        <CreateMaster onHide={() => setShowCreateMaster(false)} />
      )}
      {showEditMaster.status === true && (
        <EditMaster
          onHide={() => setShowEditMaster(false)}
          show={showEditMaster}
        />
      )}
      <div>
        <GetAllMasters onShow={setShowEditMaster} />
      </div>
    </div>
  );
};

export default MasterMenu;
