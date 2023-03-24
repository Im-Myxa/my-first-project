import React from 'react';

const Basket = () => {
  return (
    <div className='container mx-auto my-16 font-mill text-main'>
      <div className='flex space-x-2'>
        <p className='text-2xl'>Ваша корзина,</p>
        <p className='text-2xl text-main/[0.5] '>2 товара</p>
      </div>
      <div className=' mt-4 flex space-x-3'>
        <div className='w-3/4 space-y-4 border border-main/[0.1] p-2'>
          <div className='flex h-36 border border-main/[0.1] p-2 '>
            <div className='mx-auto'>
              <button>
                <img src='#' alt='#' className='h-32 w-32' />
              </button>
            </div>
            <div className='w-full'>
              <div className='flex items-center justify-between'>
                <p className='text-xl font-bold'>Название товара</p>
                <button>Удалить</button>
              </div>
              <div className='relative flex h-full items-center justify-between'>
                <div className=''>счет</div>
                <p className=''>1400</p>
                <p className='text-xl'>1400</p>
              </div>
              <div></div>
            </div>
          </div>
          <div className='flex h-36 border border-main/[0.1] p-2 '>
            <div className='mx-auto'>
              <button>
                <img src='#' alt='#' className='h-32 w-32' />
              </button>
            </div>
            <div className='w-full'>
              <div className='flex items-center justify-between'>
                <p className='text-xl font-bold'>Название товара</p>
                <button>Удалить</button>
              </div>
              <div className='relative flex h-full items-center justify-between'>
                <div className=''>счет</div>
                <p className=''>1400</p>
                <p className='text-xl'>1400</p>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        {/* <div className='w-3/4 border border-main/[0.1] bg-white p-2'>
          <div className='mt-10 mb-5 flex'>
            <h3 className='w-2/5 text-xs font-semibold uppercase text-gray-600'>
              Product Details
            </h3>
            <h3 className='w-1/5 text-center text-xs font-semibold uppercase text-gray-600 '>
              Quantity
            </h3>
            <h3 className='w-1/5 text-center text-xs font-semibold uppercase text-gray-600 '>
              Price
            </h3>
            <h3 className='w-1/5 text-center text-xs font-semibold uppercase text-gray-600 '>
              Total
            </h3>
          </div>
          <div className='-mx-8 flex items-center px-6 py-5 hover:bg-gray-100'>
            <div className='flex w-2/5'>
              <div className='w-20'>
                <img
                  className='h-24'
                  src='https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z'
                  alt=''
                />
              </div>
              <div className='ml-4 flex flex-grow flex-col justify-between'>
                <span className='text-sm font-bold'>Iphone 6S</span>
                <span className='text-xs text-red-500'>Apple</span>
                <a
                  href='#'
                  className='text-xs font-semibold text-gray-500 hover:text-red-500'
                >
                  Remove
                </a>
              </div>
            </div>
            <div className='flex w-1/5 justify-center'>
              <svg
                className='w-3 fill-current text-gray-600'
                viewBox='0 0 448 512'
              >
                <path d='M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z' />
              </svg>

              <input
                className='mx-2 w-8 border text-center'
                type='text'
                value='1'
              />

              <svg
                className='w-3 fill-current text-gray-600'
                viewBox='0 0 448 512'
              >
                <path d='M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z' />
              </svg>
            </div>
            <span className='w-1/5 text-center text-sm font-semibold'>
              $400.00
            </span>
            <span className='w-1/5 text-center text-sm font-semibold'>
              $400.00
            </span>
          </div>

          <div className='-mx-8 flex items-center px-6 py-5 hover:bg-gray-100'>
            <div className='flex w-2/5'>
              <div className='w-20'>
                <img
                  className='h-24'
                  src='https://drive.google.com/uc?id=10ht6a9IR3K2i1j0rHofp9-Oubl1Chraw'
                  alt=''
                />
              </div>
              <div className='ml-4 flex flex-grow flex-col justify-between'>
                <span className='text-sm font-bold'>Xiaomi Mi 20000mAh</span>
                <span className='text-xs text-red-500'>Xiaomi</span>
                <a
                  href='#'
                  className='text-xs font-semibold text-gray-500 hover:text-red-500'
                >
                  Remove
                </a>
              </div>
            </div>
            <div className='flex w-1/5 justify-center'>
              <svg
                className='w-3 fill-current text-gray-600'
                viewBox='0 0 448 512'
              >
                <path d='M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z' />
              </svg>

              <input
                className='mx-2 w-8 border text-center'
                type='text'
                value='1'
              />

              <svg
                className='w-3 fill-current text-gray-600'
                viewBox='0 0 448 512'
              >
                <path d='M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z' />
              </svg>
            </div>
            <span className='w-1/5 text-center text-sm font-semibold'>
              $40.00
            </span>
            <span className='w-1/5 text-center text-sm font-semibold'>
              $40.00
            </span>
          </div>

          <div className='-mx-8 flex items-center px-6 py-5 hover:bg-gray-100'>
            <div className='flex w-2/5'>
              <div className='w-20'>
                <img
                  className='h-24'
                  src='https://drive.google.com/uc?id=1vXhvO9HoljNolvAXLwtw_qX3WNZ0m75v'
                  alt=''
                />
              </div>
              <div className='ml-4 flex flex-grow flex-col justify-between'>
                <span className='text-sm font-bold'>Airpods</span>
                <span className='text-xs text-red-500'>Apple</span>
                <a
                  href='#'
                  className='text-xs font-semibold text-gray-500 hover:text-red-500'
                >
                  Remove
                </a>
              </div>
            </div>
            <div className='flex w-1/5 justify-center'>
              <svg
                className='w-3 fill-current text-gray-600'
                viewBox='0 0 448 512'
              >
                <path d='M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z' />
              </svg>
              <input
                className='mx-2 w-8 border text-center'
                type='text'
                value='1'
              />

              <svg
                className='w-3 fill-current text-gray-600'
                viewBox='0 0 448 512'
              >
                <path d='M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z' />
              </svg>
            </div>
            <span className='w-1/5 text-center text-sm font-semibold'>
              $150.00
            </span>
            <span className='w-1/5 text-center text-sm font-semibold'>
              $150.00
            </span>
          </div>
        </div> */}
        <div className='w-1/4 space-y-4 rounded-lg border border-main/[0.1] p-2'>
          <p className='border-b border-main/[0.1] p-2 text-xl'>Ваш заказ</p>
          <div className='flex items-center justify-between p-2'>
            <p className='text-lg text-main/[0.8]'>Товары (2):</p>
            <p className='text-lg text-main/[0.8]'>1400 рублей</p>
          </div>
          <div className='flex items-center justify-between p-2'>
            <p className='text-lg text-main/[0.8]'>Итого:</p>
            <p className='text-2xl font-bold text-main'>1400 рублей</p>
          </div>
          <button className='mx-auto w-full rounded-lg border border-main py-2 text-xl text-main hover:bg-main hover:text-white'>
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Basket;
