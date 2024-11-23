import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { decrement, decrementByAmount, increment, incrementByAmount, reset, setAmount } from '../slices/counterSlice';

const Counter: React.FC = () => {
  // Access the current count from the Redux store
  const count = useAppSelector((state) => state.counter.value);
  // Get the dispatch function
  const dispatch = useAppDispatch();
  // Local state for increment amount
  const [inputAmount, setInputAmount] = useState<number>(0);

  return (
    <div className="flex flex-col items-center mt-12 px-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Counter : {count}</h1>
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button onClick={() => dispatch(decrement())} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:bg-gray-200"
          disabled={count <= 0} aria-label="Decrement"
          aria-disabled={count <= 0}
        >
          -1
        </button>
        <button onClick={() => dispatch(reset())} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
          Reset
        </button>
        <button onClick={() => dispatch(increment())} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
          +1
        </button>
      </div>
      <div className="flex flex-col items-center gap-4">
        <input
          type="number"
          value={inputAmount}
          onChange={(e) => setInputAmount(Number(e.target.value))}
          className="w-24 px-2 py-1 border border-gray-400 rounded text-center"
          placeholder="Amount"
        />
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => dispatch(decrementByAmount(inputAmount))}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:bg-gray-200"
            disabled={count - inputAmount < 0}
          >
            Remove Amount
          </button>
          <button
            onClick={() => dispatch(setAmount(inputAmount))}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Set Amount
          </button>

          <button
            onClick={() => dispatch(incrementByAmount(inputAmount))}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Add Amount
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
