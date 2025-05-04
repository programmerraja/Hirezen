import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";

export interface InterviewQuestion {
  question: string;
  code?: string;
  notes?: string;
}

export interface CandidateInfo {
  skills: string[];
  experience: string[];
  education: string[];
  projects: string[];
  strengths: string[];
  areasToExplore: string[];
  yearsOfExperience: number;
  summary: string;
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

export async function extractCandidateInfo(
  resumeText: string,
  role: string
): Promise<CandidateInfo> {
  // return JSON.parse(
  //   '{"skills":["Node.js","Express.js","MongoDB","JavaScript","React","Redux","Next.js","HTML5","CSS3","Tailwind CSS","TypeScript","Data Structures","Algorithms","Leetcode","Redux Toolkit","Git","GitHub","Firebase","Framer Motion","Shadcn/ui","Socket.io"],"experience":["Jr. Frontend Engineer at THE FUTURE UNIVERSITY, Chandigarh (May DIGITS - Present)","Frontend Developer Intern at STACKKAROO, Remote (PERSON_NAME DIGITS – Mar DIGITS)","Frontend Developer Intern at TMG SECURITY, Remote (March DIGITS - May DIGITS)"],"education":["Bachelor\'s in PERSON_NAME Literature, University of Calcutta, Kolkata (Sep DIGITS)"],"projects":["NOTETS APP: REALTIME COLLABORATION - Developed a feature-rich Notes app with real-time collaboration using Next.js, Node.js, Express.js, MongoDB, and Socket.io.","SOCIAL MEDIA APP - Programmed core features for a social media platform using React, Redux Toolkit, Firebase, and Chakra UI."],"strengths":["Proficient in modern frontend technologies and frameworks.","Experience in developing responsive and interactive web applications.","Strong problem-solving and algorithmic skills."],"areasToExplore":["Clarify the candidate\'s experience with backend development.","Discuss the candidate\'s approach to team collaboration and project management."],"yearsOfExperience":2,"summary":"A skilled frontend developer with experience in React, Next.js, and modern web technologies, adept at creating responsive and interactive web applications."}'
  // );
  try {
    const prompt = `
      You are an expert HR professional. Your task is to extract key information from a candidate's resume for the role of ${role}.

      Please analyze the resume and extract the following information:
      - A list of technical and soft skills
      - A list of relevant work experiences (company, role, duration)
      - Education details
      - Notable projects
      - Key strengths relevant to the role
      - Areas that might need further exploration during the interview
      - Approximate years of experience (REQUIRED: provide a numeric value, e.g., 5 for 5 years)
      - A brief professional summary

      IMPORTANT: You must provide a numeric value for years of experience. If it's not explicitly mentioned, make your best estimate based on the work history.

      Resume content:
      ${resumeText}
    `;

    const response = await generateObject({
      model: openai("gpt-4o", { structuredOutputs: true }),
      schemaName: "candidateInfo",
      schemaDescription:
        "Structured information extracted from a candidate's resume",
      schema: z.object({
        skills: z.array(z.string()),
        experience: z.array(z.string()),
        education: z.array(z.string()),
        projects: z.array(z.string()),
        strengths: z.array(z.string()),
        areasToExplore: z.array(z.string()),
        yearsOfExperience: z.number(),
        summary: z.string(),
      }),
      prompt: prompt,
    });

    console.log("Candidate Info:", response);
    return response.object;
  } catch (error) {
    console.error("Error extracting candidate info:", error);
    throw new Error("Failed to extract candidate information");
  }
}

export async function generateInterviewQuestions(
  resumeText: string,
  role: string,
  otherNotes?: string
): Promise<InterviewQuestion[]> {
  // return JSON.parse(
  //   '{"questions":[{"question":"Given the following React component, what will be rendered on the screen?","code":"function App() {\\n  const [count, setCount] = React.useState(0);\\n  React.useEffect(() =\u003e {\\n    setCount(count + 1);\\n  }, []);\\n  return \u003cdiv\u003e{count}\u003c/div\u003e;\\n}"},{"question":"How would you optimize a React component that re-renders unnecessarily due to unchanged props?","code":""},{"question":"What will be the output of the following code snippet?","code":"function Parent() {\\n  const [value, setValue] = React.useState(0);\\n  return (\\n    \u003cdiv\u003e\\n      \u003cChild value={value} /\u003e\\n      \u003cbutton onClick={() =\u003e setValue(value + 1)}\u003eIncrement\u003c/button\u003e\\n    \u003c/div\u003e\\n  );\\n}\\nfunction Child({ value }) {\\n  React.useEffect(() =\u003e {\\n    console.log(\'Child rendered\');\\n  });\\n  return \u003cdiv\u003e{value}\u003c/div\u003e;\\n}"},{"question":"How would you implement a custom hook in React to fetch data from an API?","code":""},{"question":"What will be the output of the following code?","code":"function App() {\\n  const [text, setText] = React.useState(\'\');\\n  const handleChange = (e) =\u003e {\\n    setText(e.target.value);\\n  };\\n  return (\\n    \u003cdiv\u003e\\n      \u003cinput value={text} onChange={handleChange} /\u003e\\n      \u003cp\u003e{text}\u003c/p\u003e\\n    \u003c/div\u003e\\n  );\\n}"},{"question":"How would you handle state management in a React application with multiple components sharing the same state?","code":""},{"question":"What will be the output of the following code?","code":"function App() {\\n  const [count, setCount] = React.useState(0);\\n  React.useEffect(() =\u003e {\\n    const interval = setInterval(() =\u003e {\\n      setCount((prevCount) =\u003e prevCount + 1);\\n    }, 1000);\\n    return () =\u003e clearInterval(interval);\\n  }, []);\\n  return \u003cdiv\u003e{count}\u003c/div\u003e;\\n}"},{"question":"How would you implement a lazy-loaded component in React?","code":""},{"question":"What will be the output of the following code?","code":"function App() {\\n  const [visible, setVisible] = React.useState(false);\\n  return (\\n    \u003cdiv\u003e\\n      \u003cbutton onClick={() =\u003e setVisible(!visible)}\u003eToggle\u003c/button\u003e\\n      {visible \u0026\u0026 \u003cp\u003eHello, World!\u003c/p\u003e}\\n    \u003c/div\u003e\\n  );\\n}"},{"question":"How would you use React Context to manage a theme (light/dark) across an application?","code":""}]}'
  // ).questions;
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

export async function regenerateQuestion(
  oldQuestion: InterviewQuestion,
  role: string,
  customPrompt?: string
): Promise<InterviewQuestion> {
  try {
    const prompt = `
      You are an expert technical interviewer. Your task is to regenerate or improve an existing interview question.

      The role the candidate is applying for is ${role}.

      ${
        customPrompt
          ? `The user has provided this guidance: ${customPrompt}`
          : ""
      }

      Here is the original question that needs to be regenerated:
      ${oldQuestion.question}
      ${oldQuestion.code ? `\nCode:\n${oldQuestion.code}` : ""}

      Please generate a new, improved version of this question that is more relevant, clearer, or more challenging.
      If the original question includes code, please provide new code as well.
      
    `;

    const response = await generateObject({
      model: openai("gpt-4o", { structuredOutputs: true }),
      schemaName: "regeneratedQuestion",
      schemaDescription: "A regenerated interview question",
      schema: z.object({
        question: z.string(),
        code: z.string().optional(),
      }),
      prompt: prompt,
    });

    console.log("Regenerated Question:", response);
    return response.object;
  } catch (error) {
    console.error("Error regenerating question:", error);
    throw new Error("Failed to regenerate question");
  }
}
