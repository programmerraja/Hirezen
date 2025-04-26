import OpenAI from "openai";

export interface InterviewQuestion {
  question: string;
  notes?: string;
}

const openai = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
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

      Format the response as a JSON array of objects with a 'question' property.
      Example: [{"question": "What is..."}, ...]
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are an expert technical interviewer. Your task is to generate relevant interview questions based on a candidate's resume and the role they're applying for.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No content in response");
    }

    const parsedContent = JSON.parse(content);
    return parsedContent.questions || [];
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw new Error("Failed to generate interview questions");
  }
}
