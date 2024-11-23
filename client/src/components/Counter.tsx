import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

const Counter = () => {
  const [amount, setAmount] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Add loading state
  const loadingTimeoutRef = useRef<number | null>(null);

  // Fetch the initial count from the server when the component mounts
  useEffect(() => {
    getCount();
    // Cleanup function to clear the timeout when the component unmounts
    return () => {
      if (loadingTimeoutRef.current !== null) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  // Function to make api calls
  const callApi = async (method: string, params = {}) => {
    // Clear any existing timeout
    if (loadingTimeoutRef.current !== null) {
      clearTimeout(loadingTimeoutRef.current);
    }
    loadingTimeoutRef.current = window.setTimeout(() => {            // Start a timeout to set loading to true after 200ms
      setLoading(true);
    }, 200);
    try {
      const response = await axios.post('http://localhost:4000/api', {
        jsonrpc: '2.0',
        method: method,
        params: params,
        id: 1,
      });
      if (response.data.error) {
        setError(response.data.error.message);
      } else {
        setCount(response.data.result);
        setError(null);
      }
    } catch (err) {
      setError('Server error');
      console.error(err);
    }
    finally {
      // Clear the timeout and reset loading
      if (loadingTimeoutRef.current !== null) {
        clearTimeout(loadingTimeoutRef.current);
        loadingTimeoutRef.current = null;
      }
      setLoading(false); // Stop loading
    }
  };

  // API methods
  const increment = () => callApi('increment');
  const decrement = () => callApi('decrement');
  const reset = () => callApi('reset');
  const getCount = () => callApi('getCount');
  const incrementByAmount = () => callApi('incrementByAmount', { amount });
  const decrementByAmount = () => callApi('decrementByAmount', { amount });
  const setAmountOnServer = () => callApi('setAmount', { amount });

  return (
    <div className="flex flex-col items-center mt-12 px-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Counter : {count}</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {loading && <p className="text-gray-600 mb-4">Loading...</p>} {/* Loading indicator */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button onClick={() => decrement()} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:bg-gray-100"
          disabled={loading || count <= 0}
          aria-label="Decrement"
          aria-disabled={loading || count <= 0}
        >
          -1
        </button>
        <button onClick={() => reset()} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400" disabled={loading}>
          Reset
        </button>
        <button onClick={() => increment()} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400" disabled={loading}>
          +1
        </button>
      </div>
      <div className="flex flex-col items-center gap-4">
        <input
          type="number"
          min="1"
          step="1"
          value={amount}
          onChange={(e) => Number(e.target.value) > 0 && setAmount(Number(e.target.value))}              // Prevent from entering negative numbers
          className="w-24 px-2 py-1 border border-gray-400 rounded text-center"
          placeholder="Amount"
          disabled={loading}
        />
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => decrementByAmount()}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:bg-gray-100"
            disabled={loading || count - amount < 0}
          >
            Remove Amount
          </button>
          <button
            onClick={() => setAmountOnServer()}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:bg-gray-100"
            disabled={loading}
          >
            Set Amount
          </button>

          <button
            onClick={() => incrementByAmount()}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:bg-gray-100"
            disabled={loading}
          >
            Add Amount
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
