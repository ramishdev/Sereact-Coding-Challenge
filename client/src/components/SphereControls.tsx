import React, { useState, useEffect, useRef } from 'react';

interface SphereControlsProps {
    radius: number;
    setRadius: React.Dispatch<React.SetStateAction<number>>;
}

const SphereControls = ({ radius, setRadius }: SphereControlsProps) => {
    const [radiusInput, setRadiusInput] = useState<number>(radius);
    const [msg, setMsg] = useState<{ type: 'danger' | 'info', msg: string } | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const wsRef = useRef<WebSocket | null>(null);
    const requestIdRef = useRef<number>(0);
    const pendingRequests = useRef<{ [key: number]: (response: any) => void }>({});

    // Initialize WebSocket connection
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:4000');
        wsRef.current = ws;

        ws.onopen = () => {
            console.log('WebSocket connection established');
            getRadius(); // Fetch the initial radius from the server
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            // Handle response to a request
            if (data.id && pendingRequests.current[data.id]) {
                pendingRequests.current[data.id](data);
                delete pendingRequests.current[data.id];
            }
        };

        ws.onerror = (event) => {
            console.error('WebSocket error:', event);
            setMsg({ type: 'danger', msg: 'WebSocket error' });
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
            setMsg({ type: 'danger', msg: 'WebSocket connection closed' });
        };

        // Cleanup on component unmount
        return () => {
            ws.close();
        };
    }, []);

    // Function to make JSON-RPC calls over WebSocket
    const callApi = (method: string, params = {}): Promise<any> => {
        return new Promise((resolve, reject) => {
            if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
                setMsg({ type: 'danger', msg: 'WebSocket is not connected' });
                return reject('WebSocket is not connected');
            }

            setLoading(true);
            requestIdRef.current += 1;
            const id = requestIdRef.current;

            const request = {
                jsonrpc: '2.0',
                method: method,
                params: params,
                id: id,
            };

            pendingRequests.current[id] = (response: any) => {
                setLoading(false);
                if (response.error) {
                    setMsg({ type: 'danger', msg: response.error.message });
                    reject(response.error);
                } else {
                    setMsg(null);
                    resolve(response.result);
                }
            };

            wsRef.current.send(JSON.stringify(request));
        });
    };

    // Function to get the radius from the server
    const getRadius = () => {
        callApi('get_radius')
            .then((result) => {
                setRadius(result);
                setRadiusInput(result); // Update input field
            })
            .catch((err) => console.error(err));
    };

    // Function to set the radius on the server
    const setRadiusOnServer = () => {
        if(radiusInput === radius){
            setMsg({ type: 'info', msg: 'No changes detected. Please modify the radius.' });
            return;
        }
        if (radiusInput <= 0) {
            setMsg({ type: 'danger', msg: 'Radius must be a positive number' });
            return;
        }
        callApi('set_radius', { radius: radiusInput })
            .then(() => {
                setMsg({ type: 'info', msg: 'Radius set on server. Click "Get Radius" to update the sphere.' });
            })
            .catch((err) => console.error(err));
    };
    console.log(msg);

    return (
        <div className="flex flex-col items-center mt-8">
            {/* Display error message if any */}
            <div style={{height:'30px'}}>
                {msg && msg.type === 'danger' ? <p className="text-red-500 text-xl">{msg.msg}</p> : <p className="text-green-500 text-xl">{msg?.msg}</p>}
            </div>

            {/* Radius Input */}
            <div className="flex items-center gap-4 mb-4">
                <input
                    type="number"
                    value={radiusInput}
                    min={1}
                    onChange={(e) => setRadiusInput(Number(e.target.value))}
                    className="w-24 px-2 py-1 border border-gray-400 rounded text-center"
                    placeholder="Radius"
                    disabled={loading}
                />
                <button
                    onClick={setRadiusOnServer}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={loading}
                >
                    Set Radius
                </button>
            </div>

            {/* Display Current Radius */}
            <div className="mb-4">
                <p className="text-xl">Current Radius: {radius}</p>
            </div>

            <button
                onClick={getRadius}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                disabled={loading}
            >
                Get Radius
            </button>
        </div>
    );
};

export default SphereControls;
