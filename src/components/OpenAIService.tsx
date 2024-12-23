import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createActor } from '../declarations/backend';

const API_KEY = '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';

const canisterId = process.env.CANISTER_ID_BACKEND;

if (!canisterId) {
  throw new Error(
    'CANISTER_ID_BACKEND is not defined in the environment variables',
  );
}

const backendActor = createActor(canisterId);

const openai = axios.create({
  baseURL:
    'https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
}); 

// In-memory store for the current session
const conversationMemory: { role: string; content: string }[] = [];

// Function to summarize older parts of the conversation
const summarizeMemory = async () => {
  // Concatenate all messages in the memory
  const memoryText = conversationMemory
    .map((entry) => `${entry.role}: ${entry.content}`)
    .join('\n');

  // Format the summarization prompt
  const summarizationPrompt = `
    <|begin_of_text|>
    <|start_header_id|>system<|end_header_id|>
    You are an AI summarizer. Summarize the following conversation into a concise, clear, and meaningful summary:
    
    Conversation:
    ${memoryText}
    
    Provide a summary that retains all critical information but is no longer than 300 words.
    <|eot_id|>
  `;

  // Get the summary from OpenAI
  const response = await openai.post('', {
    inputs: summarizationPrompt,
    parameters: {
      max_new_tokens: 350,
      temperature: 0.5,
    },
    options: {
      use_cache: false,
      wait_for_model: true,
    },
  });

  // Extract the summarized text
  const summarizedText = response.data[0]?.generated_text ?? '';

  console.log('Summarized: ' + summarizedText.trim());

  return summarizedText.trim();
};

/**
 * Get OpenAI response while considering the conversation history.
 * @param query - User's query.
 * @returns Assistant's response.
 */

export const getSessionID = async () => {
  // Create a new session ID by interacting with the backend
  const sessionID = await backendActor.createSession();
  console.log('OAS', sessionID);
  return sessionID;
};

export const getAllData = async () => {
  const allData: string[] = await backendActor.getAllSessionIDs();
  console.log('Fetched all the data');
  return allData;
}

export const getOpenAIResponse = async (query: string, sessionID: string) => {
  // Add the user query to the memory
  conversationMemory.push({ role: 'user', content: query });
  // add here for the communication with Backend.mo

  // const sessionID = await backendActor.createSession();
  console.log('new OAS', sessionID);

  // Add the user's query to the backend session
  await backendActor.addMessage(sessionID, {
    role: 'user',
    content: query,
  });

  // Retrieve the conversation history for the session
  const sessionMessages = await backendActor.getMessages(sessionID);

  // Format the conversation history for the prompt, if messages exist
  let formattedMemory = '';

  // Ensure sessionMessages is not null and iterate over the outer array
  if (sessionMessages) {
    for (let i = 0; i < sessionMessages.length; i++) {
      const messageArray = sessionMessages[i]; // This is a nested array of Message objects

      // Loop through each message in the inner array and concatenate role and content
      for (let j = 0; j < messageArray.length; j++) {
        const entry = messageArray[j];

        // Concatenate the role and content in the desired format
        formattedMemory += `<|start_header_id|>${entry.role}<|end_header_id|> ${entry.content}\n\n`;
      }
    }
  }

  // Use template literals to format the prompt
  const formattedPrompt = `
    <|begin_of_text|>
    <|start_header_id|>system<|end_header_id|>
    You are a helpful and smart assistant. 
    You accurately provide an answer to the provided user query.
    
    <|eot_id|><|start_header_id|>user<|end_header_id|> 
    Here is the query: \`\`\`
    ${formattedMemory}
    \`\`\`

    Provide a precise and concise answer. 
    The answer must be below 200 words and must be in paragraph format.

    <|eot_id|><|start_header_id|>assistant<|end_header_id|>
  `;

  const response = await openai.post('', {
    inputs: formattedPrompt,
    parameters: {
      max_new_tokens: 250,
      temperature: 0.7,
      top_p: 0.9,
    },
    options: {
      use_cache: false,
      wait_for_model: true,
    },
  });

  const rawText = response.data[0]?.generated_text ?? ''; // Get the generated text
  const assistantResponse = rawText
    .split('<|start_header_id|>assistant<|end_header_id|>') // Extract only the assistant's answer
    .pop()
    ?.trim();

  // Add the assistant response to the memory
  if (assistantResponse) {
    conversationMemory.push({ role: 'assistant', content: assistantResponse });
    // add here for the communication with Backend.mo
    await backendActor.addMessage(sessionID, {
      role: 'assistant',
      content: assistantResponse,
    });
  }

  // If the memory exceeds a certain length (e.g., 15 entries), summarize it
  if (conversationMemory.length > 15) {
    const summary = await summarizeMemory();
    // Clear the memory and replace it with the summary
    conversationMemory.length = 0; // Clear memory
    conversationMemory.push({ role: 'system', content: `Summary: ${summary}` });
  }

  return assistantResponse;
};

// Clear the conversation memory (for privacy or session reset)
export const clearConversationMemory = () => {
  conversationMemory.length = 0;
};
