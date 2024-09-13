# OpenAI Assistant Project

This project utilizes the OpenAI API to create an assistant that can perform user queries.

## Requirements

- Node.js (version 14 or higher)
- NPM (installed with Node.js)

## Project Setup

1. **Clone the repository** (if you have Git):
    ```bash
    git clone <repository_URL>
    cd <project_folder_name>
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Create a configuration file**:
    - Create a `.env` file in the root folder of your project.
    - Add your OpenAI API key:
      ```
      OPENAI_API_KEY=your_api_key
      ASSISTANT_ID=
      THREAD_ID=
      ```
    - Futher after you need to add ASSISTANT_ID, THREAD_ID
     ```
      OPENAI_API_KEY=
      ASSISTANT_ID=your_assistant_id
      THREAD_ID=your_thead_id
      ```
      these two values you will get after first app run in console
## Usage

1. Open the `script.js` file.
2. Configure the assistant's name by changing the `assistantName` variable:
    ```javascript
    const assistantName = "Your assistant's name"; // Change this variable to your desired name
    ```
3. Set your message by altering the `userMessage` variable:
    ```javascript
    const userMessage = "Your query here"; // Change to your message
    ```

4. Set your message by altering the `instructions` variable:
    ```javascript
    const instructions = "Yourinstructions"; // Change to your instructions
    ```

5. Run the script:
    ```bash
    node script.js
    ```

## Notes

- The assistant's name and message need to be specified in the code.
- Error messages will be displayed in the console if any issues arise.