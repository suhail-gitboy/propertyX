import { InferenceClient } from "@huggingface/inference";
import { pipeline } from "@xenova/transformers";

let generator;
import dotenv from "dotenv"
dotenv.config()
const client = new InferenceClient(process.env.HUGGINGFACE);

export async function getEmbedding(text) {
    const embedding = await client.featureExtraction({
        model: "sentence-transformers/all-MiniLM-L6-v2",
        inputs: text,
    });

    return embedding;
}


export const textGenerate = async (properties, userQuery) => {
    const list = properties
        .map((p, i) => `${i + 1}. ${p.title} in ${p.location}`)
        .join("\n");

    const prompt = `
User searched for: "${userQuery}"

Found ${properties.length} properties:

${list}

Write a friendly response suggesting these properties.
Do not mention ratings.
Keep it neat and attractive  and helpful.
also you can dynamically change response according the accurate item  
`;

    // Use textGeneration task
    const response = await client.chatCompletion({
        model: "deepseek-ai/DeepSeek-V3.2", // Hosted with provider
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt }
        ],
        max_tokens: 150,
        temperature: 0.7
    });

    return response.choices[0].message.content;


};