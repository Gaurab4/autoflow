const express = require('express');
const dotenv = require('dotenv');
const Groq = require('groq-sdk'); 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Initialize Groq client
const client = new Groq({
    apiKey: process.env.GROQ_API_KEY, 
});

// Function to get chat completion from Groq
async function getGroqChatCompletion(prompt) {
    return client.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "llama3-8b-8192",
      });
}

// Endpoint to handle chat completions
app.post('/api/generate', async (req, res) => {
    const { prompt } = req.body;

    try {
        // Get the chat completion
        const response = await getGroqChatCompletion(prompt);
        if (response.choices && response.choices.length > 0) {
            res.json({ content: response.choices[0].message.content });
        } else {
            res.status(500).json({ error: 'No response from the API' });
        }
    } catch (error) {
        console.error('Error generating response:', error);
        res.status(500).send('Error generating response');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
