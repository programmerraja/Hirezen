import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "sonner";
import { generateInterviewQuestions, InterviewQuestion } from "@/utils/openai";
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
}

interface InterviewContextType {
  interviewData: InterviewData;
  page: number;
  isLoading: boolean;
  updateInterviewData: (data: Partial<InterviewData>) => void;
  setPage: (page: number) => void;
  generateQuestions: () => Promise<void>;
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
      const generatedQuestionsArray = await generateInterviewQuestions(
        processedText,
        interviewData.role,
        interviewData.otherNotes
      );

      updateInterviewData({ questions: generatedQuestionsArray });
      setPage(2);
    } catch (error) {
      console.error("Error generating questions:", error);
      toast.error(
        "Failed to generate questions. Please check your OpenAI API key and try again."
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
