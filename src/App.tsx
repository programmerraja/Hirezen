"use client";
import { useEffect } from "react";
import { Header } from "@/components/header";
import { CandidateForm } from "@/components/CandidateForm";
import { InterviewQuestions } from "@/components/InterviewQuestions";
import { InterviewProvider, useInterview } from "@/contexts/InterviewContext";

function AppContent() {
  const { page, startNewInterview, handlePrint } = useInterview();

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
      reactApp.style.width = "490px";
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


  return (
    <div className="flex flex-col min-h-screen bg-background w-full overflow-hidden">
      <Header startNewInterview={startNewInterview} handlePrint={handlePrint} />
      <main className="flex-1 w-full py-4 px-3">
        <div className="flex flex-col items-center w-full">
          {page === 1 && <CandidateForm />}
          {page === 2 && <InterviewQuestions />}
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
