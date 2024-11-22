import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { decrement, decrementByAmount, increment, incrementByAmount, reset, setAmount } from '../slices/counterSlice';

const Counter = () => {
  // Access the current count from the Redux store
  const count = useAppSelector((state) => state.counter.value);
  // Get the dispatch function
  const dispatch = useAppDispatch();
  // Local state for increment amount
  const [inputAmount, setInputAmount] = useState<number>(0);

  return (
    <div>
      <h1>Counter : {count}</h1>
      <div style={{ textAlign: 'center', marginTop: '40px', display: 'flex', justifyContent: 'space-evenly' }}>
        <button onClick={() => dispatch(decrement())} >
          -1
        </button>
        <button onClick={() => dispatch(reset())}>
          Reset
        </button>
        <button onClick={() => dispatch(increment())} >
          +1
        </button>
      </div>
      <div>
        <input
          type="number"
          value={inputAmount}
          onChange={(e) => setInputAmount(Number(e.target.value))}
        />
        <div>
          <button
            onClick={() => dispatch(decrementByAmount(inputAmount))}
          >
            Remove Amount
          </button>
          <button
            onClick={() => dispatch(setAmount(inputAmount))}
          >
            Set Amount
          </button>

          <button
            onClick={() => dispatch(incrementByAmount(inputAmount))}
          >
            Add Amount
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
