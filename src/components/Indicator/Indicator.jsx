import React from 'react';
import './Indicator.css';
import name from './icons/name.svg';
import gender from './icons/gender.svg';
import weight from './icons/weight.svg';

export default function Indicator({ formIndex }) {
  return (
    <div className='container-indicator'>
      <div className='container-lines'>
        <div
          className='line upper-line'
          style={{
            width:
              formIndex === 1
                ? '0%'
                : formIndex === 2
                ? '50%'
                : formIndex === 3
                ? '100%'
                : '',
          }}></div>
        <div className='line under-line'></div>
      </div>

      <div className='container-img'>
        <div className='card'>
          <div className='double-face'>
            <div className='bloc-img'>
              <img src={gender} />
            </div>
            <div className='back-indice'>
              <p className='indice '>Trop facile pour avoir un indice. 😃</p>
            </div>
          </div>
        </div>
        <div className='card'>
          <div className='double-face'>
            <div className='bloc-img'>
              <img src={weight} />
            </div>
            <div className='back-indice'>
              <p className='indice '>Mérignac est une belle commune.</p>
            </div>
          </div>
        </div>
        <div className='card'>
          <div className='double-face'>
            <div className='bloc-img'>
              <img src={name} />
            </div>
            <div className='back-indice'>
              <p className='indice '>Tu vas y arriver 💪.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
