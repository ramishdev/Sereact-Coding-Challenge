import { useEffect, useRef, useState } from 'react';

const Counter = () => {
  const [amount, setAmount] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Add loading state
  const loadingTimeoutRef = useRef<number | null>(null);
  const wsRef = useRef<WebSocket | null>(null);   // WebSocket reference to maintain the connection
  const requestIdRef = useRef<number>(0);    // Unique ID for each JSON-RPC request
  const pendingRequests = useRef<{ [key: number]: (response: any) => void }>({});    // Map to store pending requests with their corresponding resolver functions and timeout IDs

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4000');
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connection established');
      // Fetch initial count
      getCount();
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // Check if the message is a response to a request
        if (data.id && data.id in pendingRequests.current) {
          pendingRequests.current[data.id](data);
          // Remove the request from the pendingRequests map
          delete pendingRequests.current[data.id];
        }
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
        setError('Invalid data received');
      }
    };

    ws.onerror = (event) => {
      console.error('WebSocket error:', event);
      setError('WebSocket error');
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
      setError('WebSocket connection closed');
      if (loadingTimeoutRef.current !== null) {
        clearTimeout(loadingTimeoutRef.current);
        loadingTimeoutRef.current = null
      }
    };

    // Cleanup on unmount
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
      if (loadingTimeoutRef.current !== null) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  // Function to make JSON-RPC calls over WebSocket
  const callApi = (method: string, params = {}): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        setError('WebSocket is not connected');
        return reject('WebSocket is not connected');
      }
      // Clear any existing loading timeout
      if (loadingTimeoutRef.current !== null) {
        clearTimeout(loadingTimeoutRef.current);
      }

      // Start a timeout to set loading to true after 200ms
      loadingTimeoutRef.current = window.setTimeout(() => {
        setLoading(true);
      }, 200);

      requestIdRef.current += 1;
      const id = requestIdRef.current;

      const request = {
        jsonrpc: '2.0',
        method: method,
        params: params,
        id: id,
      };

      pendingRequests.current[id] = (response: any) => {
        if (loadingTimeoutRef.current !== null) {
          clearTimeout(loadingTimeoutRef.current);
          loadingTimeoutRef.current = null;
        }
        setLoading(false);
        if (response.error) {
          setError(response.error.message);
          reject(response.error);
        } else {
          setError(null);
          resolve(response.result);
        }
      };

      wsRef.current.send(JSON.stringify(request));
    });
  };

  // API methods
  const increment = () => {
    callApi('increment')
      .then((result) => setCount(result))
      .catch((err) => console.error(err));
  };

  const decrement = () => {
    callApi('decrement')
      .then((result) => setCount(result))
      .catch((err) => console.error(err));
  };

  const reset = () => {
    callApi('reset')
      .then((result) => setCount(result))
      .catch((err) => console.error(err));
  };

  const getCount = () => {
    callApi('getCount')
      .then((result) => setCount(result))
      .catch((err) => console.error(err));
  };

  const incrementByAmount = () => {
    callApi('incrementByAmount', { amount })
      .then((result) => setCount(result))
      .catch((err) => console.error(err));
  };

  const decrementByAmount = () => {
    callApi('decrementByAmount', { amount })
      .then((result) => setCount(result))
      .catch((err) => console.error(err));
  };

  const setAmountOnServer = () => {
    callApi('setAmount', { amount })
      .then((result) => setCount(result))
      .catch((err) => console.error(err));
  };


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
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value >= 0 || e.target.value === '') {
              setAmount(value);
            }
          }}              // Prevent from entering negative numbers
          className="w-24 px-2 py-1 border border-gray-400 rounded text-center"
          placeholder="Amount"
          disabled={loading}
        />
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => decrementByAmount()}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:bg-gray-100"
            disabled={loading || amount === 0 || count - amount < 0}
          >
            Remove Amount
          </button>
          <button
            onClick={() => setAmountOnServer()}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:bg-gray-100"
            disabled={loading || amount === 0}
          >
            Set Amount
          </button>

          <button
            onClick={() => incrementByAmount()}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:bg-gray-100"
            disabled={loading || amount === 0}
          >
            Add Amount
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
