import OpenAI from "openai";

const baseUrl = process.env.OPENAI_BASE_URL;

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: baseUrl,
});

export default openaiClient;
