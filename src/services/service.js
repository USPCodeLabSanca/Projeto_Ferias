import { InferenceClient } from "@huggingface/inference";

async function requisicaoIA (prompt){
  const client = new InferenceClient(process.env.HF_TOKEN);
  const chatCompletion = await client.chatCompletion({
    model: "deepseek-ai/DeepSeek-V3-0324",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return chatCompletion.choices[0].message.content;
}

export default requisicaoIA;