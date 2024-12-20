import axios from 'axios';

const API_KEY = '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';

const openai = axios.create({
  baseURL:
    'https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const getOpenAIResponse = async (query: string) => {
  // Use template literals to format the prompt
  const formattedPrompt = `
    <|begin_of_text|>
    <|start_header_id|>system<|end_header_id|>
    You are a helpful and smart assistant. 
    You accurately provide an answer to the provided user query.
    
    <|eot_id|><|start_header_id|>user<|end_header_id|> 
    Here is the query: \`\`\`
    ${query}
    \`\`\`

    Provide a precise and concise answer. 
    The answer must be below 200 words and in paragraph format.
    
    <|eot_id|><|start_header_id|>assistant<|end_header_id|>
  `;

  const response = await openai.post('', {
    inputs: formattedPrompt,
    parameters: {
      max_new_tokens: 250, // Limit to 20 tokens for the response
      temperature: 0.7,   // Adjust randomness
      top_p: 0.9,         // Nucleus sampling
    },
    options: {
      use_cache: false,    // Ensure no caching
      wait_for_model: true // Wait if the model is loading
    },
  });

  const rawText = response.data[0]?.generated_text ?? ''; // Get the generated text4
  const assistantResponse = rawText
    .split('<|start_header_id|>assistant<|end_header_id|>')
    .pop()
    ?.trim(); // Extract only the assistant's answer

  return assistantResponse;
};
