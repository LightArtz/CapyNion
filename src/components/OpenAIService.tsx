import axios from 'axios';

const API_KEY = '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';

const openai = axios.create({
  baseURL: 'https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
  },
});

export const getOpenAIResponse = async (query: string) => {
  // Use template literals to format the prompt
  const formattedPrompt = `<|begin_of_text|><|start_header_id|>system<|end_header_id|>You are a helpful and smart assistant. You accurately provide answer to the provided user query.<|eot_id|><|start_header_id|>user<|end_header_id|> Here is the query: \`\`\`${query}\`\`\`.
        Provide precise and concise answer.<|eot_id|><|start_header_id|>assistant<|end_header_id|>`;

  const response = await openai.post('', {
    inputs: formattedPrompt, // Send the formatted prompt
    options: { 
      use_cache: false, // Optional: Control cache behavior
    },
    max_tokens: 5000, // Adjust max_tokens as needed
  });

  return response.data;
};
