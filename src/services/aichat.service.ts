import { model } from "../config/gemini";
import { AppError } from "../errors/AppError"

type AiResponse = {
    content: string
}

export async function handleAiChat(question: string): Promise<AiResponse> {


    if (!question) {
        throw new AppError(400, "Question is required");
    }

    const response = await model.invoke(question);

    return {
        content: String(response.content)
    }
}