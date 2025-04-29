import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";

export interface InterviewQuestion {
  question: string;
  code?: string;
  notes?: string;
}

// const openai = new OpenAI({
//   baseURL: "https://models.inference.ai.azure.com",
//   apiKey: import.meta.env.VITE_OPENAI_API_KEY,
//   dangerouslyAllowBrowser: true,
// });

const openai = createOpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

export async function generateInterviewQuestions(
  resumeText: string,
  role: string,
  otherNotes?: string
): Promise<InterviewQuestion[]> {
  try {
    const prompt = `
      You are an expert technical interviewer. Your task is to generate relevant interview questions based on a candidate's resume and the role they're applying for.

      The role the candidate is applying for is ${role}. attached the caditate resume for reference

      Try to avoid asking theory based questions like Can you explain the difference between functional and class components in React, etc
      instead of have 10% of theory based questions, have 90% of the questions to be practical. let say you taking interview for react then
      give simple react component code and ask what will be happens when the component render or what will be the output of the code.etc

      If it was backend try to ask questions like what will be the output of this code, or what will be the error in this code, etc.

      Resume content:
      ${resumeText}

      ${otherNotes ? `Additional notes: ${otherNotes}` : ""}

    `;

    const response = await generateObject({
      model: openai("gpt-4o", { structuredOutputs: true }),
      schemaName: "interviewQuestions",
      schemaDescription:
        "A list of 10 question if the question is code based include code property else ingore",
      schema: z.object({
        questions: z.array(
          z.object({
            question: z.string(),
            code: z.string(),
          })
        ),
      }),
      prompt: prompt,
    });

    console.log("Content:", response);
    return response.object.questions || [];
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw new Error("Failed to generate interview questions");
  }
}
