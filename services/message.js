const { OpenAI } = require('openai');
const client = require('./openaiClient');

const addMessage = async (threadId, message) => {
  console.log("Adding a new message to thread: " + threadId);
  const response = await client.beta.threads.messages.create(threadId, {
      role: "user",
      content: message
  });
  return response;
};

module.exports = { addMessage };