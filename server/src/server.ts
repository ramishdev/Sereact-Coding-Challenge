import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

// Counter state
let counter = 0;

// Define JSON-RPC interfaces
interface JsonRpcRequest {
    jsonrpc: '2.0';
    method: string;
    params?: any;
    id?: number | string | null;
}

interface JsonRpcResponse {
    jsonrpc: '2.0';
    result?: any;
    error?: {
        code: number;
        message: string;
        data?: any;
    };
    id: number | string | null;
}

// JSON-RPC Error Codes
const JsonRpcErrorCodes = {
    PARSE_ERROR: -32700,
    INVALID_REQUEST: -32600,
    METHOD_NOT_FOUND: -32601,
    INVALID_PARAMS: -32602,
    INTERNAL_ERROR: -32603,
};

// Helper function to process a single JSON-RPC request
function processRequest(request: JsonRpcRequest): JsonRpcResponse {
    const { method, params = {}, id } = request;
    
    // Define the methods
    const methods: { [key: string]: () => number } = {
        increment: () => {
            counter += 1;
            return counter;
        },
        decrement: () => {
            counter -= 1;
            return counter;
        },
        reset: () => {
            counter = 0;
            return counter;
        },
        getCount: () => {
            return counter;
        },
        incrementByAmount: () => {
            const amount = params.amount;
            if (amount === undefined) {
                throw { code: JsonRpcErrorCodes.INVALID_PARAMS, message: 'Invalid params: amount is missing' };
            }
            if (typeof amount !== 'number') {
                throw { code: JsonRpcErrorCodes.INVALID_PARAMS, message: 'Invalid params: amount must be a number' };
            }
            counter += amount;
            return counter;
        },
        decrementByAmount: () => {
            const amount = params.amount;
            if (amount === undefined) {
                throw { code: JsonRpcErrorCodes.INVALID_PARAMS, message: 'Invalid params: amount is missing' };
            }
            if (typeof amount !== 'number') {
                throw { code: JsonRpcErrorCodes.INVALID_PARAMS, message: 'Invalid params: amount must be a number' };
            }
            counter -= amount;
            return counter;
        },
        setAmount: () => {
            const amount = params.amount;
            if (amount === undefined) {
                throw { code: JsonRpcErrorCodes.INVALID_PARAMS, message: 'Invalid params: amount is missing' };
            }
            if (typeof amount !== 'number') {
                throw { code: JsonRpcErrorCodes.INVALID_PARAMS, message: 'Invalid params: amount must be a number' };
            }
            counter = amount;
            return counter;
        },
    };

    try {
        if (!methods[method]) {
            throw { code: JsonRpcErrorCodes.METHOD_NOT_FOUND, message: 'Method not found' };
        }

        const result = methods[method]();
        return {
            jsonrpc: '2.0',
            result: result,
            id: id || null,
        };
    } catch (error: any) {
        return {
            jsonrpc: '2.0',
            error: {
                code: error.code || JsonRpcErrorCodes.INTERNAL_ERROR,
                message: error.message || 'Internal error',
                data: error.data || null,
            },
            id: id || null,
        };
    }
}

// Helper function to validate a JSON-RPC request
function validateRequest(request: JsonRpcRequest): boolean {
    if (
        !request ||
        request.jsonrpc !== '2.0' ||
        typeof request.method !== 'string' ||
        (request.params && typeof request.params !== 'object') ||
        (request.id !== undefined && typeof request.id !== 'string' && typeof request.id !== 'number' && request.id !== null)
    ) {
        return false;
    }
    return true;
}


// Endpoint to handle JSON-RPC requests
app.post('/api', (req: Request, res: Response) => {
    const body = req.body;
    try {
        // Validate the request
        if (!validateRequest(body)) {
            return res.status(400).json({
                jsonrpc: '2.0',
                error: {
                    code: JsonRpcErrorCodes.INVALID_REQUEST,
                    message: 'Invalid Request',
                },
                id: body && body.id ? body.id : null,
            });
        }

        // Process the request
        const response = processRequest(body);

        if (response.id === null) {
            // Notification, do not send a response
            res.status(204).send();
        } else {
            res.json(response);
        }
    } catch (error) {
        // Parse error or internal error
        res.status(400).json({
            jsonrpc: '2.0',
            error: {
                code: JsonRpcErrorCodes.PARSE_ERROR,
                message: 'Parse error',
            },
            id: null,
        });
    }

});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`JSON-RPC server is running on port ${PORT}`);
});
