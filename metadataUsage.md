# OpenAI Massage metadata
We can use the "metadata" field as an additional parameter when sending a message using the OpenAI API. The metadata field can be used to pass additional context or information that might not be directly part of the message content but is useful for your application.

For example, if you want to send a message along with metadata that indicates the language (such as "language": "en"), you can include the metadata field in your request body.

Updated Code Example:

When calling the beta.threads.messages.create method, you can pass the metadata field like this:

```js
async function addMessage(threadId, message, language) {
    console.log("Adding a new message to thread: " + threadId);
    const response = await client.beta.threads.messages.create(threadId, {
        role: "user",
        content: message,
        metadata: {
            language: language // Add the metadata parameter here
        }
    });
    return response;
}
```

Usage in Code:

If you want to send the message in English and pass the metadata:
```js
const engUserMessage = "Am if number no up period regard sudden better...";
sendMessage(engUserMessage, "en");
```

In this case, the metadata will carry the "language": "en" information along with the message content.
Key Points:

    - The metadata field allows you to add custom information to your request (e.g., language, session ID, or any other relevant data).
    - You can define this metadata yourself, and it will be part of the request sent to OpenAI. It won't affect how the model generates responses directly unless your logic or instructions rely on it.
    - The metadata can be useful for tracking purposes or in cases where you need additional context for message processing or logging.