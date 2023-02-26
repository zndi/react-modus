import { useState, useEffect } from 'react';
import data from '../../../data.json';
import './Letter.css';

export default function (props) {
  const [inputsNames, setInputsNames] = useState(props.inputsNames);
  const [showLetter, setShowLetter] = useState(false);

  const toMatch = [...data.name.toLocaleUpperCase()];
  let inputElement = [];
  const audios = {
    jingle: new Audio('/sounds/jingle.mp3'),
    exist: new Audio('/sounds/match-word.mp3'),
    missing: new Audio('/sounds/match-missing.mp3'),
    exact: new Audio('/sounds/match-exact.mp3'),
    victory: new Audio('/sounds/victory.mp3'),
    error: new Audio('/sounds/error.mp3'),
  };

  useEffect(() => {
    const audio = new Audio('/sounds/jingle.mp3');
    audio.play();
  }, []);

  useEffect(() => {
    let showLettersTimer;
    if (props.numberOfTry) {
      const currentInput = props.inputsNames[props.numberOfTry - 1].name;
      showLettersTimer = [...currentInput].map((l, i) => {
        return setTimeout(
          () => {
            if (
              document
                .querySelector(`#letter${props.numberOfTry}${i}`)
                .classList.value.includes('found')
            ) {
              audios.exact.play();
            } else if (
              document
                .querySelector(`#letter${props.numberOfTry}${i}`)
                .classList.value.includes('exist')
            ) {
              audios.exist.play();
            } else {
              audios.missing.play();
            }
            if (i + 1 === toMatch.length) {
              if (
                currentInput.toLocaleUpperCase() ===
                data.name.toLocaleUpperCase()
              ) {
                audios.victory.play();
              } else {
                audios.error.play();
                props.anotherAttempt()
              }
            }

            document
              .querySelector(`#letter${props.numberOfTry}${i}`)
              .classList.remove('hide-last');
          },
          i === 0 ? 10 : (i) * 350
        );
      });
    }
    return () => showLettersTimer?.forEach((timer) => clearTimeout(timer));
  }, [props.numberOfTry]);

  return (
    <>
      {props.numberOfTry === 0 && (
        <div key='0' id={`letters${props.numberOfTry}`} className='letters'>
          {toMatch.map((l, i) => (
            <span
              key={`letter${props.numberOfTry}${i}`}
              id={`letter${props.numberOfTry}${i}`}
              className={`letter ${i === 0 ? 'found' : ''}`}>
              {i === 0 ? l : '.'}
            </span>
          ))}
        </div>
      )}
      {props.numberOfTry > 0 &&
        props.inputsNames
          .sort((a, b) => a.position - b.position)
          .map((a, b) => {
            inputElement = [];
            return (
              <div
                key={`letters${b + 1}`}
                id={`letters${b + 1}`}
                className='letters'>
                {[...a.name].map((l, i) => {
                  inputElement.push(l.toLocaleUpperCase());
                  return (
                    <span
                      key={`letter${b + 1}${i}`}
                      id={`letter${b + 1}${i}`}
                      className={`letter ${
                        // props.numberOfTry !== 1 &&
                        b + 1 === props.numberOfTry ? 'hide-last' : ' '
                      } ${
                        toMatch[i] === l.toLocaleUpperCase()
                          ? 'found'
                          : toMatch.includes(l.toLocaleUpperCase()) &&
                            inputElement.reduce((acc, next) => {
                              acc[next]
                                ? (acc[next] = acc[next] + 1)
                                : (acc[next] = 1);
                              return acc;
                            }, {})[l.toLocaleUpperCase()] <
                              toMatch.reduce((acc, next) => {
                                acc[next]
                                  ? (acc[next] = acc[next] + 1)
                                  : (acc[next] = 1);
                                return acc;
                              }, {})[l.toLocaleUpperCase()]
                          ? ' exist'
                          : ''
                      }`}>
                      {l}
                    </span>
                  );
                })}
              </div>
            );
          })}
    </>
  );
}
