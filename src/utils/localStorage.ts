import { InterviewQuestion, CandidateInfo } from "./openai";

export interface InterviewData {
  interviewerName: string;
  candidateName: string;
  role: string;
  yearsOfExperience?: number;
  otherNotes?: string;
  questions: InterviewQuestion[];
  selectionStatus: "Selected" | "Rejected" | "";
  finalFeedback: string;
  candidateInfo?: CandidateInfo;
}

const CURRENT_INTERVIEW_KEY = "currentInterview";

export const saveCurrentInterview = (data: InterviewData): void => {
  try {
    const serializedData = {
      ...data,
      questions: {
        role: data.role,
        yearsOfExperience: data.yearsOfExperience,
        questions: data.questions,
      },
      candidateInfo: data.candidateInfo,
    };

    localStorage.setItem(CURRENT_INTERVIEW_KEY, JSON.stringify(serializedData));
  } catch (error) {
    console.error("Error saving interview to local storage:", error);
  }
};

export const loadCurrentInterview = (): InterviewData | null => {
  try {
    const data = localStorage.getItem(CURRENT_INTERVIEW_KEY);
    if (!data) return null;

    return JSON.parse(data) as InterviewData;
  } catch (error) {
    console.error("Error loading interview from local storage:", error);
    return null;
  }
};

export const clearCurrentInterview = (): void => {
  localStorage.removeItem(CURRENT_INTERVIEW_KEY);
};

export const updateQuestionNotes = (index: number, notes: string): void => {
  try {
    const currentInterview = loadCurrentInterview();
    if (!currentInterview) return;

    const updatedQuestions = [...currentInterview.questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      notes,
    };

    saveCurrentInterview({
      ...currentInterview,
      questions: updatedQuestions,
    });
  } catch (error) {
    console.error("Error updating question notes:", error);
  }
};

export const updateQuestionsList = (questions: InterviewQuestion[]): void => {
  try {
    const currentInterview = loadCurrentInterview();
    if (!currentInterview) return;

    saveCurrentInterview({
      ...currentInterview,
      questions,
    });
  } catch (error) {
    console.error("Error updating questions list:", error);
  }
};
