const Groq = require("groq-sdk");
const dotenv = require('dotenv');
dotenv.config();

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY, 
});


async function getGroqChatCompletion(prompt) {
  try {
    const response = await client.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `You are a flowchart generation assistant. Only handle queries related to workflow processes like 'login process' or 'user registration'. If the user asks something unrelated, kindly decline. User query: "${prompt}"`,
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
