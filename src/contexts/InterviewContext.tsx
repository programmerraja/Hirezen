import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "sonner";
import {
  generateInterviewQuestions,
  InterviewQuestion,
  extractCandidateInfo,
  CandidateInfo,
  regenerateQuestion,
} from "@/utils/openai";
import { processPDF } from "@/utils/pdfUtils";
import {
  saveCurrentInterview,
  loadCurrentInterview,
} from "@/utils/localStorage";
import { generatePDF, PrintData } from "@/utils/pdfUtils";

export type SelectionStatus = "Selected" | "Rejected" | "";

export interface InterviewData {
  interviewerName: string;
  candidateName: string;
  role: string;
  otherNotes: string;
  resumeFile: File | null;
  resumePreview: string | null;
  questions: InterviewQuestion[];
  selectionStatus: SelectionStatus;
  finalFeedback: string;
  candidateInfo?: CandidateInfo;
}

interface InterviewContextType {
  interviewData: InterviewData;
  page: number;
  isLoading: boolean;
  updateInterviewData: (data: Partial<InterviewData>) => void;
  setPage: (page: number) => void;
  generateQuestions: () => Promise<void>;
  regenerateQuestionById: (
    index: number,
    customPrompt?: string
  ) => Promise<void>;
  startNewInterview: () => void;
  handlePrint: () => Promise<void>;
}

const defaultInterviewData: InterviewData = {
  interviewerName: "",
  candidateName: "",
  role: "",
  otherNotes: "",
  resumeFile: null,
  resumePreview: null,
  questions: [],
  selectionStatus: "",
  finalFeedback: "",
  candidateInfo: undefined,
};

const InterviewContext = createContext<InterviewContextType | undefined>(
  undefined
);

export const InterviewProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [interviewData, setInterviewData] =
    useState<InterviewData>(defaultInterviewData);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const currentInterview = loadCurrentInterview();
    if (currentInterview) {
      setInterviewData({
        interviewerName: currentInterview.interviewerName || "",
        candidateName: currentInterview.candidateName || "",
        role: currentInterview.role || "",
        otherNotes: currentInterview.otherNotes || "",
        resumeFile: null,
        resumePreview: null,
        questions: currentInterview.questions || [],
        selectionStatus: currentInterview.selectionStatus || "",
        finalFeedback: currentInterview.finalFeedback || "",
        candidateInfo: currentInterview.candidateInfo,
      });

      if (currentInterview.questions && currentInterview.questions.length > 0) {
        setPage(2);
      }
    }
  }, []);

  useEffect(() => {
    if (
      interviewData.candidateName ||
      interviewData.interviewerName ||
      interviewData.role
    ) {
      saveCurrentInterview({
        interviewerName: interviewData.interviewerName,
        candidateName: interviewData.candidateName,
        role: interviewData.role,
        otherNotes: interviewData.otherNotes,
        questions: interviewData.questions,
        selectionStatus: interviewData.selectionStatus,
        finalFeedback: interviewData.finalFeedback,
        candidateInfo: interviewData.candidateInfo,
      });
    }
  }, [interviewData]);

  const updateInterviewData = (data: Partial<InterviewData>) => {
    setInterviewData((prev) => ({ ...prev, ...data }));
  };

  const generateQuestions = async () => {
    if (!interviewData.resumeFile || !interviewData.role) {
      toast.error("Please upload a resume and enter the role.");
      return;
    }

    setIsLoading(true);
    try {
      const processedText = await processPDF(interviewData.resumeFile);

      // Extract candidate information
      const candidateInfoPromise = extractCandidateInfo(
        processedText,
        interviewData.role
      );

      // Generate interview questions
      const questionsPromise = generateInterviewQuestions(
        processedText,
        interviewData.role,
        interviewData.otherNotes
      );

      const [candidateInfo, generatedQuestionsArray] = await Promise.all([
        candidateInfoPromise,
        questionsPromise,
      ]);

      // Update the interview data with both results
      updateInterviewData({
        questions: generatedQuestionsArray,
        candidateInfo: candidateInfo,
      });

      setPage(2);
    } catch (error) {
      console.error(
        "Error generating questions or extracting candidate info:",
        error
      );
      toast.error(
        "Failed to process resume. Please check your OpenAI API key and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const startNewInterview = () => {
    setInterviewData(defaultInterviewData);
    localStorage.removeItem("currentInterview");
    setPage(1);
  };

  const regenerateQuestionById = async (
    index: number,
    customPrompt?: string
  ) => {
    try {
      setIsLoading(true);

      // Get the current question
      const currentQuestion = interviewData.questions[index];
      if (!currentQuestion) {
        toast.error("Question not found");
        return;
      }

      const newQuestion = await regenerateQuestion(
        currentQuestion,
        interviewData.role,
        customPrompt
      );

      const updatedQuestions = [...interviewData.questions];
      updatedQuestions[index] = {
        ...newQuestion,
        notes: currentQuestion.notes, // Preserve any existing notes
      };

      updateInterviewData({ questions: updatedQuestions });

      toast.success("Question regenerated successfully");
    } catch (error) {
      console.error("Error regenerating question:", error);
      toast.error("Failed to regenerate question");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = async () => {
    try {
      if (!interviewData.candidateName || !interviewData.interviewerName) {
        toast.error(
          "Please enter interviewer and candidate names before printing"
        );
        return;
      }

      const printData: PrintData = {
        interviewerName: interviewData.interviewerName,
        candidateName: interviewData.candidateName,
        role: interviewData.role,
        otherNotes: interviewData.otherNotes,
        selectionStatus: interviewData.selectionStatus,
        finalFeedback: interviewData.finalFeedback,
        questions: interviewData.questions,
        candidateInfo: interviewData.candidateInfo,
      };

      await generatePDF(printData);
      toast.success("PDF generated successfully");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF");
    }
  };

  return (
    <InterviewContext.Provider
      value={{
        interviewData,
        page,
        isLoading,
        updateInterviewData,
        setPage,
        generateQuestions,
        regenerateQuestionById,
        startNewInterview,
        handlePrint,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = (): InterviewContextType => {
  const context = useContext(InterviewContext);
  if (context === undefined) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }
  return context;
};
