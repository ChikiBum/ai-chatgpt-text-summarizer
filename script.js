require('dotenv').config();

const {createAssistant}  = require('./services/assistant');
const {createThread}  = require('./services/thread');
const {checkingStatus}  = require('./services/checkingStatus');
const {addMessage}  = require('./services/message');
const client = require('./services/openaiClient');

const model = "gpt-4o-mini";

let assistantId = process.env.ASSISTANT_ID || null;
let threadId =  process.env.THREAD_ID || null;
const temperature = .2
const maxCheckCount = 15;

let pollingInterval;

const instructions = `You are a text summarization and evaluation assistant. Your tasks are as follows:
1. **Input**: Accept input text in origin language.
2. **Language** Define the language of the text and place it in a TARGET_LANGUAGE variable. Further in the instructions where you see {TARGET_LANGUAGE} use the value of this variable TARGET_LANGUAGE value for the instruction.  
3. **Summary**: Provide a summary of the text in the {TARGET_LANGUAGE} language.
4. **Keywords**: Extract and list relevant keywords from the text in the {TARGET_LANGUAGE} language.
5. **Title**: Generate a catchy and relevant title based on the content of the text in the {TARGET_LANGUAGE}language.
6. **Tone**: Determine and specify the tone of the text as either 'positive' or 'negative' in the {TARGET_LANGUAGE} language.
7. **Output Format**: Respond in the following JSON format:
{
  "summary": Summary,
  "keys": Keywords,
  "title": Title,
  "tone": Tone,
"language" :{TARGET_LANGUAGE} 
}
8. **Constraints**: Ensure that all fields in the JSON response ("summary", "keys", "title", "tone", "language") are in the {TARGET_LANGUAGE} language. Provide output strictly in the JSON format without any additional text or commentary. You cannot provide a response in a language different from the input text language.

Ensure accuracy in summarization, relevance in keywords, creativity in title generation, and precision in tone evaluation. Your response should adhere to the JSON structure exactly as specified.

Always provide the answer in the same language in which the query was entered. If the text is in Russian, the answer should be in Russian. If the text is in English, the answer should be in English. If the text is in Ukrainian, the answer is in Ukrainian. If the text is in German, the answer is in German.`;

const assistantName = "Text Summarizer Beta 1"; 

async function sendMessage(message) {
    
    if (!assistantId) {
        console.log('Assistant ID is empty. Creating a new assistant...');
        await createAssistant(model, instructions, assistantName);
    }
    
    if (!threadId) {
        console.log('Thread ID is empty. Creating a new thread...');
        await createThread();
    }

    if (threadId) {
        console.log('New message creatind wit thread id ', threadId);
        await addMessage(threadId, message);
    }

    if (assistantId && threadId){
        try {
            console.log('Sending request...');
            
            const run = await client.beta.threads.runs.create(
                threadId,
                {
                    assistant_id: assistantId,
                    temperature
                }
            )

            pollingInterval = setInterval(() => {
                checkingStatus(threadId, run.id, pollingInterval, maxCheckCount);
            }, 5000);

        } catch (error) {
            console.error('Error sending message:', error.response ? error.response.data : error.message);
            process.exit(1); 
        }
    }
}


const urkUserMessage = "Вважаючи, що знехтували таким чином дозволом на існування. У дизайні активний характер бути непростим. Тридцять для видалення багато розглядають вас літо хоча. Він віддає перевагу з'єднанню, враженому. Упередженість або продовження певних принципів як. Вважаючи, що ми маємо намір підтримувати допомогу."; 

const engUserMessage = "Am if number no up period regard sudden better. Decisively surrounded all admiration and not you. Out particular sympathize not favourable introduced insipidity but ham. Rather number can and set praise. Distrusts an it contented perceived attending oh. Thoroughly estimating introduced stimulated why but motionless. "; 

const rusUserMessage = "Веря пренебрег так так разрешение существование отъезд в. В дизайне активный нрав быть беспокойным. Тридцать для удалить много рассматривать вас лето хотя. Он предпочтение связь удивленный на из ye. Пристрастность на или продолжающийся в частности принципы как. Делать веря о располагающий к поддерживаемому разрешению мы."; 


// Specify your message below
sendMessage(engUserMessage);