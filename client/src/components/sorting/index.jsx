import React from 'react';
import { sortArr } from '../../utils/sorting';
import PropTypes from 'prop-types';

const Sorting = ({ onSortType }) => {

  return (
    <div className='flex gap-2 '>
      <label>
        Сортировать по:
      </label>
      <select onChange={(event) => onSortType(event.target.value)} className={'rounded-lg'} defaultValue={'Выбери тип'}>
        <option defaultValue={'Выбери тип'} disabled>{'Выбери тип'}</option>
        {sortArr.map(item => {
          return (
            <option 
              key={item.name} 
              value={item.name} 
            >
              {item.name}
            </option>);
        })};
      </select>
      
    </div>
    



  );
};

Sorting.propTypes = {
  onSortType: PropTypes.func
};

export default Sorting;
