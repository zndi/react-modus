import React, { useState, useEffect } from 'react';
import './Gender.css';
import data from '../../data.json';

export default function Gender(props) {
  const [validate, setValidate] = useState(false);
  const [gender, setGender] = useState('');

  const handleRadio = (e) => {
    setGender(e.target.value);
  };

  useEffect(() => {
    if (validate && gender && props.error) {
      props.updateView(2, !(gender === data.gender));
      setValidate(false);
    } else if (validate && gender === data.gender) {
      props.updateView(2, !(gender === data.gender));
    }
  }, [props.error, gender, validate]);

  const validGender = () => {
    setValidate(true);
    props.setError(!(gender === data.gender));
  };

  return (
    <div>
      <p>
        Bon avouez que ce n'est pas dificile une chance sur deux au pire vous
        pouvez recommencer ?
      </p>
      <label htmlFor='female'>👧</label>
      <input
        onChange={handleRadio}
        type='radio'
        name='gender'
        id='female'
        value='female'
      />

      <label htmlFor='male'>👦</label>
      <input
        onChange={handleRadio}
        type='radio'
        name='gender'
        id='male'
        value='male'
      />

      <button
        className={props.error ? 'active' : ''}
        onClick={() => gender && validGender()}>
        Valider
      </button>
    </div>
  );
}
