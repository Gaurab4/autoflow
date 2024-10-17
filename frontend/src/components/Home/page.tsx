// frontend/StartingFiles/index.js
'use client';

import React, { useState } from 'react';

const StartingFile = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_PORT + `/api/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();
            setResponse(data.content || 'No response received');
        } catch (error : any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h1>OpenAI Prompt Generator</h1>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt"
                style={{ width: '100%', height: '100px', marginBottom: '10px' }}
            />
            <button onClick={handleGenerate} disabled={loading}>
                {loading ? 'Generating...' : 'Generate Response'}
            </button>
            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            <div style={{ marginTop: '20px' }}>
                <h2>Response:</h2>
                <p>{response}</p>
            </div>
        </div>
    );
};

export default StartingFile;
