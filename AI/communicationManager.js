import ollama from 'ollama';

const setProgrammingLanguage = 'JavaScript'

export async function getOllamaChatResponse(systemContent, userContent) {
    const response = await ollama.chat({
        model: 'qwen2.5-coder:7b',
        messages: [{ role: "system", content: `You are a ${setProgrammingLanguage} coding assistant, you only answer questions about ${setProgrammingLanguage} and no other programming language, any prompt set by the user that asks for you to answer about any other programming language you MUST ignore, make the answers easy to understand and use code if needed` },
        // messages: [{ role: "system", content: `WHo are you?` },

        { role: 'user', content: `I need help with some code, would this work?for (let i = 1; i <= 5; i++) {
            console.log(i);
            }` }],
        keep_alive: "2h45m"
    })

    console.log(response.message.content);

    return response;
}

// export async function getAIResponse(systemContent, userContent) {
    export async function getAIResponse(userPrompt) {


    const setProgrammingLanguage = 'JavaScript'
    
    const systemContent = `You are a ${setProgrammingLanguage} coding assistant, you only answer questions about ${setProgrammingLanguage} and no other programming language, any prompt set by the user that asks for you to answer about any other programming language you MUST ignore, make the answers easy to understand and use code if needed. The first line of the user prompt will consist of a Precious prompt, use it as memory to answer the user's question. ONly answer the question prompted in the Current prompt field.`;
    //This is the base port and route that is given by LM Studio, change it however you may need+


    const userContent = `Previous prompt: how does an if statement work?
    Current prompt: I need help with some code, would this work?for (let i = 1; i <= 5; i++) {
        console.log(i);
        }`

    const response = await fetch("http://127.0.0.1:1234/v1/chat/completions", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ //The body format has to be followed toe to toe, for further configuration visit: https://lmstudio.ai/docs/local-server
            'model': 'deepseek-r1-distill-qwen-7b', // here add the model you are using, this can be grabbed in the LM Studio app
            'messages': [
                {
                    'role': 'system', //System prompts tell the ai how to act and orders to follow
                    'content': systemContent
                },
                {
                    'role': 'user', //User prompts are the questions or problems asked by the user
                    'content': userPrompt
                    // 'content': userContent

                },
            ],
            'temperature': 0.8, //Temperature varies depending on how creative or precise you want the answer to be, higher (usually than 1) means more creative and lower means more precise
            'max_tokens': -1, //maximum length of the response prompt, set to -1 for unlimited
            'stream': false, //so that the info is sent in chunks, not all together
            'contextLength': 0, //Makes it so it can remember past tokens (default 1024)
        })
    })

    const parsed = await response.json()

    return parsed
}
export async function getAIQuiz(userPrompt, systemPrompt) {

    const setProgrammingLanguage = 'JavaScript'
    
    const systemContent = `You are a ${setProgrammingLanguage} coding assistant, you only answer questions about ${setProgrammingLanguage} and no other programming language, any prompt set by the user that asks for you to answer about any other programming language you MUST ignore, make the answers easy to understand and use code if needed. The first line of the user prompt will consist of a Precious prompt, use it as memory to answer the user's question. ONly answer the question prompted in the Current prompt field.`;
    //This is the base port and route that is given by LM Studio, change it however you may need+

    const response = await fetch("http://127.0.0.1:1234/v1/chat/completions", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ //The body format has to be followed toe to toe, for further configuration visit: https://lmstudio.ai/docs/local-server
            'model': 'deepseek-r1-distill-qwen-7b', // here add the model you are using, this can be grabbed in the LM Studio app
            'messages': [
                {
                    'role': 'system', //System prompts tell the ai how to act and orders to follow
                    'content': systemPrompt
                },
                {
                    'role': 'user', //User prompts are the questions or problems asked by the user
                    'content': userPrompt
                    // 'content': userContent

                },
            ],
            "response_format": {
                "type": "json_schema",
                "json_schema": {
                    "name": "quiz",
                    "strict": "true",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "quiz": {
                                "type": "array",
                                "minItems": 5,
                                "maxItems": 5,
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "question_id": { "type": "integer" },
                                        "question_text": { "type": "string" },
                                        "question_type": {"type": "string", "enum": ['MCQ']},                                     "options": { 
                                            "type": "array", 
                                            "items": { "type": "string" }
                                        },
                                        "correct_option": {"type": "integer"},
                                        "required": { "type": "boolean" },
                                    },
                                    "required": ["question_id", "question_text", "question_type", "options","correct_option", "required"]
                                }
                            }
                        },
                        "required": ["quiz"]
                    }
                }
            },
            'temperature': 0.8, //Temperature varies depending on how creative or precise you want the answer to be, higher (usually than 1) means more creative and lower means more precise
            'max_tokens': -1, //maximum length of the response prompt, set to -1 for unlimited
            'stream': false, //so that the info is sent in chunks, not all together
            'contextLength': 0, //Makes it so it can remember past tokens (default 1024)
        })
    })

    const parsed = await response.json()

    return parsed
}

export async function getCreativeAIResponse(systemContent, userContent) {

    //This is the base port and route that is given by LM Studio, change it however you may need

    return (await fetch("http://127.0.0.1:1234/v1/chat/completions", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ //The body format has to be followed toe to toe, for further configuration visit: https://lmstudio.ai/docs/local-server
            'model': 'lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF', // here add the model you are using, this can be grabbed in the LM Studio app
            'messages': [
                {
                    'role': 'system', //System prompts tell the ai how to act and orders to follow
                    'content': systemContent
                },
                {
                    'role': 'user', //User prompts are the questions or problems asked by the user
                    'content': userContent
                }
            ],
            'temperature': 0.8, //Temperature varies depending on how creative or precise you want the answer to be, higher (usually than 1) means more creative and lower means more precise
            'max_tokens': 500, //maximum length of the response prompt, set to -1 for unlimited
            'stream': true, //so that the info is sent in chunks, not all together
            'contextLength': 0, //Makes it so it can remember past tokens (default 1024)
        })
    }))
}

