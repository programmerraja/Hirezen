import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { CandidateForm } from "@/components/CandidateForm";
import { InterviewQuestions } from "@/components/InterviewQuestions";
import { InterviewProvider, useInterview } from "@/contexts/InterviewContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CandidateInfo } from "@/components/CandidateInfo";
import { EmptyQuestions } from "@/components/EmptyQuestions";
import { Feedback } from "@/components/Feedback";
import { ResizeHandle } from "@/components/ResizeHandle";
import { FileText, User, MessageSquare, ClipboardCheck } from "lucide-react";

function AppContent() {
  const {
    startNewInterview,
    handlePrint,
    interviewData,
    setPage,
    generateQuestions,
  } = useInterview();

  const [activeTab, setActiveTab] = useState<string>("form");

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);

    if (value === "form") {
      setPage(1);
    } else if (value === "questions") {
      setPage(2);
    }
  };

  const hide = () => {
    const reactApp = document.querySelector(
      "#react-chrome-app"
    ) as HTMLDivElement;
    if (reactApp.style.height !== "0px") {
      reactApp.style.height = "0px";
      reactApp.style.width = "50px";
      reactApp.style.overflowY = "hidden";
    } else {
      reactApp.style.height = "100vh";
      // Restore to the saved width instead of hardcoded value
      const currentWidth = window.getExtensionWidth ? window.getExtensionWidth() : 690;
      reactApp.style.width = `${currentWidth}px`;
      reactApp.style.overflowY = "scroll";
    }
  };

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "m" && e.ctrlKey) {
        hide();
      }
    };
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Handle adding a new question manually
  // const handleAddQuestion = () => {
  //   const newQuestion = {
  //     question: "",
  //   };

  //   const updatedQuestions = [newQuestion, ...(interviewData.questions || [])];
  //   updateInterviewData({ questions: updatedQuestions });
  // };

  return (
    <div className="flex flex-col min-h-screen bg-background w-full overflow-hidden relative">
      <ResizeHandle />
      <Header startNewInterview={startNewInterview} handlePrint={handlePrint} />
      <main className="flex-1 w-full py-5 px-4">
        <div className="flex flex-col items-center w-full">
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="flex w-full mb-6 gap-2">
              <TabsTrigger
                value="form"
                className="flex items-center justify-center gap-2"
              >
                <FileText className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">Form</span>
              </TabsTrigger>
              <TabsTrigger
                value="info"
                className="flex items-center justify-center gap-2"
                disabled={!interviewData.candidateInfo}
              >
                <User className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">Info</span>
              </TabsTrigger>
              <TabsTrigger
                value="questions"
                className="flex items-center justify-center gap-2"
              >
                <MessageSquare className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">Questions</span>
              </TabsTrigger>
              <TabsTrigger
                value="feedback"
                className="flex items-center justify-center gap-2"
              >
                <ClipboardCheck className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">Feedback</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="form">
              <CandidateForm />
            </TabsContent>

            <TabsContent value="info">
              {interviewData.candidateInfo && (
                <CandidateInfo
                  candidateInfo={interviewData.candidateInfo}
                  candidateName={interviewData.candidateName}
                  role={interviewData.role}
                />
              )}
            </TabsContent>

            <TabsContent value="questions">
              {interviewData.questions && interviewData.questions.length > 0 ? (
                <InterviewQuestions />
              ) : (
                <EmptyQuestions onAddQuestion={generateQuestions} />
              )}
            </TabsContent>

            <TabsContent value="feedback">
              <Feedback />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <InterviewProvider>
      <AppContent />
    </InterviewProvider>
  );
}
