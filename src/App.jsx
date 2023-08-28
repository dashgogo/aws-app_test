import { useEffect, useState, useContext, useRef, useReducer, useMemo, useCallBack } from 'react';
import './App.css'
import ShinCodeContext from './main';
import SomeChild from './SomeChild';

const reducer = (state, action) => {
  switch(action.type){
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
};

function App() {
  const [count, setCount] = useState(0);
  const shincodeInfo = useContext(ShinCodeContext);
  const ref = useRef();
  const [state, dispatch] = useReducer(reducer, 0);

  const handleClick = () =>{
    setCount( count+1 );
    console.log(count);
  }

  //呼ばれるタイミングを指定する　無限ループ注意
  useEffect(() => {
    console.log("Hello Hooks");
  }, [count]);

  const handleRef = () => {
    console.log(ref.current.value);
    console.log(ref.current.offsetHeight);
  };

  //useMemo
  const [count01, setCount01] = useState(0);
  const [count02, setCount02] = useState(0);

  const square = useMemo(() => {
    let i = 0;
    //重い処理
    while(i < 2000 ){
      i++;
    };
    return count02 * count02;
  }, [count02]);

  //useCallBack 関数のメモ化  
  const [counter, setCounter] = useState(0);

  const showCount = () => {
    alert("これは重い処理です");
  };

  // const showCount = useCallBack(() => {
  //   alert("これは重い処理です");
  // }, [counter]);


  return (
  <div className='App'>
    <h1>UseState, useEffect</h1>
    <button onClick={handleClick}>+</button>
    <p>{count}</p>

    <hr />
    <h1>useContext</h1>
    <p>{shincodeInfo.name}</p>
    <p>{shincodeInfo.age}</p>

    <hr />
    <h1>useRef</h1>
    <input type='text' ref={ref} />
    <button onClick={handleRef}>UseRef</button>

    <hr />
    <h1>useReducer</h1>
    <p>カウント: {state} </p>
    <button onClick={() => dispatch({ type: "increment" })}>+</button>
    <button onClick={() => dispatch({ type: "decrement" })}>-</button>

    <hr />
    <h1>useMemo</h1>
    <div>カウント1: {count01}</div>
    <div>カウント2: {count02}</div>
    <div>結果: {square}</div>
    <button onClick={() => setCount01(count01 + 1)}>+</button>
    <button onClick={() => setCount02(count02 + 1)}>+</button>

    <hr />
    <h1>useCallBack</h1>
    <SomeChild showCount = {showCount} />
  </div>
  );
}

export default App
