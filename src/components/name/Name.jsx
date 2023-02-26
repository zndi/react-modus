import { useState, useRef } from 'react';
import './Name.css';
import data from '../../data.json';
import Letter from './letter/Letter';

export default function Name(props) {
  const [inputsNames, setInputsNames] = useState(null);

  const [lengthName, setLengthName] = useState(data.name.length);
  const inputName = useRef(null);
  const [enable, setEnable] = useState(true);
  const [numberOfTry, setNumberOfTry] = useState(0);

  const anotherAttempt = () => {
    setEnable(true);
    inputName.current.disabled = false;
  };
  const validInputName = (e) => {
    e.preventDefault();
    setNumberOfTry(numberOfTry + 1);
    console.log(inputName)
    
    setInputsNames(
      inputsNames
        ? [
            ...inputsNames,
            { name: inputName.current.value, position: numberOfTry + 1 },
          ]
        : [{ name: inputName.current.value, position: numberOfTry + 1 }]
    );
    setEnable(false);
    inputName.current.disabled = true;
    inputName.current.value = '';
  };

  return (
    <div className='container-name'>
      <form onSubmit={(e) => validInputName(e)} className='input-group'>
        <input
          required
          ref={inputName}
          minLength={lengthName}
          maxLength={lengthName}
          className={`input-name`}
          type='text'
        />
        <button
          type='submit'
          className={`button-name ${enable ? '' : 'disabled'}`}>
          👇
        </button>
      </form>
      <Letter inputsNames={inputsNames} numberOfTry={numberOfTry} anotherAttempt={anotherAttempt} />
    </div>
  );
}
