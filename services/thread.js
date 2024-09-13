const { OpenAI } = require('openai');
const client = require('./openaiClient');

async function createThread() {
  try {
      const thread = await client.beta.threads.create(); 
      //if uncommented, then at the first launch it will substitute the ID and make a request
      // threadId = thread.id; 
      console.log(`Thread created: Thread ID: ${thread.id}`);
      console.log(`Get new assistant ID and assign value to THREAD_ID in .env`)
  } catch (error) {
      console.error('Error creating thread:', error.response ? error.response.data : error.message);
      process.exit(1); 
  }
}

module.exports = { createThread };