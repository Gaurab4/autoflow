const Groq = require("groq-sdk");
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');
const path = require('path');



const promptFilePath = path.resolve(__dirname, 'prompt.txt');

let promptFromFile = '';

try {
  promptFromFile = fs.readFileSync(promptFilePath, 'utf-8');
} catch (error) {
  console.error("Error reading prompt.txt file:", error);
}

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY, 
});


// Async function for chat completion
async function getGroqChatCompletion(prompt) {
  try {
    const response = await client.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `${promptFromFile} User query: "${prompt}"`,
        },
      ],
      model: "llama3-8b-8192",
    });
    return response;
  } catch (error) {
    console.error("Error fetching Groq chat completion:", error);
    throw error;
  }
}


module.exports = { getGroqChatCompletion };
