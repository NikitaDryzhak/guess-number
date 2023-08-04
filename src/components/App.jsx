import { nanoid } from 'nanoid';
import { useEffect, useMemo, useState } from 'react';
import css from './App.module.css';

export const App = () => {
  const [number, setNumber] = useState('');
  const [results, setResults] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (answers.length === 5 || results.includes('WIN!')) {
      setDisabled(true);
    }
  }, [answers, results]);

  const randomNumber = () => {
    const min = Math.ceil(10);
    const max = Math.floor(99);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const random = useMemo(() => randomNumber(), []);

  const numOfBtns = 10;
  let btns = [];
  const getBtns = () => {
    for (let i = 0; i < numOfBtns; i++) {
      btns.push(i);
    }
  };
  getBtns();

  const isGuessed = num => {
    const guessedNumber = Number(num);

    if (guessedNumber === random) {
      setResults(prev => [...prev, 'WIN!']);
    } else if (guessedNumber > random) {
      setResults(prev => [...prev, 'LOWER']);
    } else if (guessedNumber < random) {
      setResults(prev => [...prev, 'HIGHER']);
    }
  };

  
 
  const getBtnValue = e => {

    setNumber(() => {
     const num = number + e.target.value;
      if (num.length === 2) {
        isGuessed(num);
        setAnswers(prev => [...prev, num]);
        setNumber('');
      }
      return num;
    });
  };

  
  return (
    <div className={css.main}>
      <h2 className={css.mainText}>Guess the number from 10 to 99</h2>

      <ul className={css.btnsList}>
        {btns.map(btn => (
          <li key={btn} className={css.btnsListItem}>
            <button
              value={btn}
              onClick={getBtnValue}
              className={css.button}
              disabled={disabled}
            >
              {btn}
            </button>
          </li>
        ))}
      </ul>
      <div className={css.answContainer}>
        <ul className={css.list}>
          {answers.map(answer => (
            <li key={nanoid()} className={css.answer}>
              <span className={css.span}>{answer}</span>
            </li>
          ))}
        </ul>
        <ul className={css.list}>
          {results.map(result =>
            result === 'WIN!' ? (
              <li key={nanoid()} className={`${css.result} ${css.winner}`}>
                <span className={css.span}>{result}</span>
              </li>
            ) : (
              <li key={nanoid()} className={css.result}>
                <span className={css.span}>{result}</span>
              </li>
            )
          )}
        </ul>
      </div>
      {answers.length === 4 && <h2 className={css.text}>LAST TRY!</h2>}
      {answers.length === 5 && !results.includes('WIN!') && (
        <div><h4 className={css.text}>THE NUMBER IS {random}</h4>
        <h2 className={css.text}>GAME OVER</h2></div>
      )}
    </div>
  );
};
