import React, { useState, useReducer, useEffect } from 'react';
import './Page.css';
import Gender from './gender/Gender';
import Indicator from './Indicator/Indicator';
import Weight from './weight/Weight';
import Name from './name/Name';

export default function MultiForm() {
  const TIME = 3;
  const [formIndex, setFormIndex] = useState(1);
  const [error, setError] = useState(false);
  const [breakTime, setBreakTime] = useState(TIME);

  const [state, dispatch] = useReducer(reducer);

  function reducer(state, action) {
    switch (action.type) {
      case 'TICK':
        breakTime === 0 && setError(false);
        breakTime > 0 && setBreakTime(breakTime - 1);
    }
  }

  useEffect(() => {
    let id;
    error &&
      (id = window.setInterval(() => {
        dispatch({ type: 'TICK' });
      }, 1000));

    return () => {
      window.clearInterval(id);
    };
  }, [error]);

  const updateView = (index) => {
    setBreakTime(TIME);
    !error && setFormIndex(index);
  };

  const elements = [
    <Gender
      setError={setError}
      error={error}
      updateView={updateView}
      key='gender'
    />,
    <Weight
      setError={setError}
      error={error}
      updateView={updateView}
      key='weight'
    />,
    <Name updateView={updateView} key='name' />,
  ];

  return (
    <div className='container-page'>
      <Indicator formIndex={formIndex} />
      {elements.map((item, index) => {
        if (index + 1 === formIndex) {
          return item;
        }
      })}
      {error && (
        <span className='error'>
          Loupé... Vous êtes bloqué pendant {breakTime} secondes, n'hésite pas à
          promener ta sourit sur les images pour avoir des indices 😁.
        </span>
      )}

      {formIndex === 3 && (
        <div className='indice-modus'>
          <div className='indice-modus-color'>
            <span className='letter-indice found'>A</span>
            <span className='indice-modus-comment'>
              lettre trouvé et à la bonne position.
            </span>
          </div>
          <div className='indice-modus-color'>
            <span className='letter-indice exist'>A</span>
            <span className='indice-modus-comment'>
              lettre trouvé mais pas à la bonne position.
            </span>
          </div>
          <div className='indice-modus-color'>
            <span className='letter-indice '>A</span>
            <span className='indice-modus-comment'>Pas de correspondance.</span>
          </div>
          <span className='indice-modus-comment'>
            Comme indice vous aurez que la prémière lettre 🙈.{' '}
          </span>
        </div>
      )}
    </div>
  );
}
