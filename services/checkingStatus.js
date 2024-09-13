const { OpenAI } = require('openai');

const client = require('./openaiClient');

let checkCount = 1;

const checkingStatus = async (threadId, runId, pollingInterval, maxCheckCount = 5) => {
  const checkStatus = async () => {
      if (checkCount >= maxCheckCount) {
          console.error('Max check count reached. Force stopping the application.');
          clearInterval(pollingInterval);
          process.exit(1);
      }

      try {
          const runObject = await client.beta.threads.runs.retrieve(threadId, runId);
          const status = runObject.status;
          
          console.log("Current status: " + status, ' checkCount: ', checkCount);

          if (status === "completed") {
              clearInterval(pollingInterval);
              const messagesList = await client.beta.threads.messages.list(threadId);
              const lastAnswer = messagesList.data[0].content[0].text.value;
              
              console.log('Assistant answer: ', lastAnswer);
              
              const tokensUsed = runObject.usage;
              console.log('tokensUsed obj: ', tokensUsed)
              console.log(`Total Prompts tokens used : ${tokensUsed.prompt_tokens}`);
              console.log(`Tokens used in the response: ${tokensUsed.completion_tokens}`);
              console.log(`Total number of tokens: ${tokensUsed.total_tokens}`);
          } else if (status === "failed") {
              console.error('Request failed. Force stopping the application.');
              clearInterval(pollingInterval);
              process.exit(1);
          }

          checkCount++;
      } catch (error) {
          console.error('Error checking status:', error.response ? error.response.data : error.message);
          clearInterval(pollingInterval);
          process.exit(1);
      }
  };

  checkStatus();
};

module.exports = { checkingStatus };