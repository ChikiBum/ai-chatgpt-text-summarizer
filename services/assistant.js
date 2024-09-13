const { OpenAI } = require('openai');
const client = require('./openaiClient');

async function createAssistant(model, instructions, assistantName) {
  try {
      const assistant = await client.beta.assistants.create({
          model,
          instructions,
          name: assistantName 
      });
      //if uncommented, then at the first launch it will substitute the ID and make a request
      // assistantId = assistant.id;
      console.log(`Assistant created: Assistant ID: ${assistant.id}`);
      console.log(`Get new assistant ID and assign value to ASSISTANT_ID in .env`)
  } catch (error) {
      console.error('Error creating assistant:', error.response ? error.response.data : error.message);
      process.exit(1);
  }
}

module.exports = { createAssistant };