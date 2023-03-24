/* eslint-disable indent */
import React from 'react';
import PropTypes from 'prop-types';

const ModalExample = ({
  show,
  onHide,
  title,
  name,
  price,
  description,
  image,
  onSetName,
  onSetPrice,
  onSetDescription,
  onCreate,
  onChangeImage,
  onSetImage,
  onClear,
  oldImage,
  onSetOldImage
}) => {
  if (!show) return null;

  const handleOnBackDropClick = e => {
    if (e.target.id === 'backdrop') {
      onHide();
      if (!show.edit) {
        onSetName('');
        onSetDescription('');
        onSetPrice('');
        onSetImage('');
        onSetOldImage('');
      }
    }
  };

  return (
    <div
      id='backdrop'
      onClick={handleOnBackDropClick}
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'
    >
      <div className='overflow-y h-auto w-96 rounded p-5 selection:bg-white'>
        <h1 className=' text-2xl font-bold text-blue-500'>{title}</h1>
        <label className='text-xs'>
          Название:
          <input
            placeholder='Название'
            type='text'
            value={name}
            onChange={e => onSetName(e.target.value)}
            className='mt-2 w-full rounded border border-gray-500 p-1 '
          />
        </label>
        <label className='mt-2 flex cursor-pointer items-center justify-center border-2 border-dotted bg-gradient-to-r from-blue-300 to-blue-600 py-2 font-mill text-xs'>
          Прикрепить изорбажение:
          <input type='file' className='hidden' onChange={onChangeImage} />
        </label>
        <div className='flex items-center justify-center object-cover py-2'>
          {oldImage && (
            <img
              src={`http://localhost:8080/${oldImage}`}
              alt={oldImage.name}
            />
          )}
          {image && <img src={URL.createObjectURL(image)} alt={image.name} />}
        </div>
        {show.type === 'product' || show.type === 'service' ? (
          <>
            <label className='text-xs'>
              Стоимость:
              <input
                placeholder='Стоимость'
                type='text'
                value={price}
                onChange={e => onSetPrice(e.target.value)}
                className='mt-2 w-full rounded border border-gray-500 p-1 '
              />
            </label>
            <label className='text-xs'>
              Описание продукта:
              <textarea
                placeholder='Описание'
                type='text'
                value={description}
                onChange={e => onSetDescription(e.target.value)}
                className='mt-1 h-40 w-full resize-none rounded-lg border bg-sky-100 py-1 px-2 text-xs outline-none placeholder:text-gray-700'
              />
            </label>{' '}
          </>
        ) : null}
        <div className='flex items-center justify-between '>
          <button
            className='mt-2 bg-blue-500 py-2 px-5 text-white'
            onClick={onCreate}
          >
            Создать
          </button>
          <button
            className='mt-2 bg-blue-500 py-2 px-5 font-mill text-white'
            onClick={onClear}
          >
            Создать
          </button>
        </div>
      </div>
    </div>
  );
};

ModalExample.propTypes = {
  show: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  onHide: PropTypes.func,
  title: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  description: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  oldImage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onSetName: PropTypes.func,
  onSetPrice: PropTypes.func,
  onSetDescription: PropTypes.func,
  onCreate: PropTypes.func,
  onChangeImage: PropTypes.func,
  onSetImage: PropTypes.func,
  onSetOldImage: PropTypes.func,
  onClear: PropTypes.func
};

export default ModalExample;
