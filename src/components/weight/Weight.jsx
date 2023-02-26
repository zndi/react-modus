import { useState, useRef, useEffect } from 'react';
import './Weight.css';
import data from '../../data.json';

export default function Weight(props) {
  const inputWeight = useRef(null);
  const [valid, setvalid] = useState(false);
  const validWeight = (e) => {
    e.preventDefault()
    props.setError(!(data.weight === inputWeight.current.value));
    setvalid(true);
  };

  useEffect(() => {
    setvalid(false);
    valid && props.updateView(3);
  }, [valid]);

  useEffect(() => {
    props.setError(false);
  }, []);

  return (
    <form onSubmit={(e) => validWeight(e)}>
      <p>Bien, et quel est son poids en gramme ?</p>
      <input
        ref={inputWeight}
        placeholder='0'
        className='poids'
        type='number'
      />

      <button
        className={props.error ? 'active' : ''}
        onClick={(e) => validWeight(e)}>
        Valider
      </button>
    </form>
  );
}
