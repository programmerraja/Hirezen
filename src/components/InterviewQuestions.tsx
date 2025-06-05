import { useState, useRef, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { InterviewQuestion } from "@/utils/openai";
import {
  // ArrowLeft,
  Plus,
  Edit,
  X,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { useInterview } from "@/contexts/InterviewContext";

import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function InterviewQuestions() {
  const {
    interviewData,
    // setPage,
    regenerateQuestionById,
    isLoading,
  } = useInterview();

  const { questions } = interviewData;

  const [questionsList, setQuestionsList] =
    useState<InterviewQuestion[]>(questions);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedQuestion, setEditedQuestion] = useState<InterviewQuestion>({
    question: "",
  });
  const [regeneratingIndex, setRegeneratingIndex] = useState<number | null>(
    null
  );
  const [regeneratePrompt, setRegeneratePrompt] = useState<string>("");
  const [showPromptInput, setShowPromptInput] = useState<number | null>(null);

  const editRef = useRef<HTMLDivElement>(null);
  const promptInputRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setQuestionsList(questions);
  }, [questions]);

  const handleRemoveQuestion = useCallback(
    (index: number) => {
      const updatedQuestions = [...questionsList];
      updatedQuestions.splice(index, 1);
      setQuestionsList(updatedQuestions);
      setEditingIndex(null);
    },
    [questionsList]
  );

  const handleSaveQuestion = useCallback(
    (index: number) => {
      if (editedQuestion.question.trim() === "") {
        handleRemoveQuestion(index);
        return;
      }

      const updatedQuestions = [...questionsList];
      updatedQuestions[index] = editedQuestion;
      setQuestionsList(updatedQuestions);
      setEditingIndex(null);
    },
    [editedQuestion, questionsList, handleRemoveQuestion]
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        editRef.current &&
        !editRef.current.contains(event.target as Node) &&
        editingIndex !== null
      ) {
        handleSaveQuestion(editingIndex);
      }

      if (
        showPromptInput !== null &&
        promptInputRef.current &&
        !promptInputRef.current.contains(event.target as Node)
      ) {
        setShowPromptInput(null);
        setRegeneratePrompt("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editingIndex, handleSaveQuestion, showPromptInput]);

  const handleRegenerateQuestion = useCallback(
    async (index: number) => {
      try {
        if (regeneratingIndex !== null) return;

        setRegeneratingIndex(index);
        toast.promise(
          regenerateQuestionById(index, regeneratePrompt || undefined),
          {
            loading: "Regenerating question...",
            success: "Question regenerated successfully!",
            error: "Failed to regenerate question",
          }
        );

        setShowPromptInput(null);
        setRegeneratePrompt("");
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          setRegeneratingIndex(null);
        }, 500);
      }
    },
    [regenerateQuestionById, regeneratePrompt, regeneratingIndex]
  );

  const handleShowPromptInput = useCallback(
    (index: number, event?: React.MouseEvent) => {
      if (event && event.shiftKey) {
        handleRegenerateQuestion(index);
        return;
      }

      setShowPromptInput(index);
      setRegeneratePrompt("");
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 100);
    },
    [handleRegenerateQuestion]
  );

  const handleEditQuestion = useCallback(
    (index: number) => {
      setEditingIndex(index);
      setEditedQuestion({ ...questionsList[index] });
    },
    [questionsList]
  );

  const handleAddQuestion = useCallback(() => {
    window.scrollTo(0, 0);

    const newQuestion: InterviewQuestion = {
      question: "",
    };

    const updatedQuestions = [newQuestion, ...questionsList];
    setQuestionsList(updatedQuestions);

    setEditingIndex(0);
    setEditedQuestion(newQuestion);
  }, [questionsList]);

  // const goBackToCandidateInfo = () => setPage(1);

  return (
    <div className="w-full h-[85vh] relative">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleAddQuestion}
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full shadow-md absolute top-2 right-4 z-20 bg-background hover:bg-accent/10 border border-border/50"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Add New Question</p>
        </TooltipContent>
      </Tooltip>

      <ScrollArea className="flex-1 w-full rounded-md border h-[calc(100%-40px)]">
        <div className="sticky top-0 bg-background z-10 flex justify-between items-center p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              {/* <Button
                onClick={goBackToCandidateInfo}
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button> */}
            </TooltipTrigger>
            <TooltipContent>
              <p>Back to Candidate Info</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex flex-col gap-6 p-4 w-full">
          {questionsList &&
            questionsList.map((q: InterviewQuestion, index: number) => (
              <div
                key={index}
                className="border rounded-lg p-4 shadow-sm hover:border-border/80 transition-all w-full"
              >
                {editingIndex === index ? (
                  <div className="flex flex-col mb-4" ref={editRef}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 w-full">
                        <Label
                          htmlFor={`edit-question-${index}`}
                          className="block text-xs font-medium mb-1"
                        >
                          Question
                        </Label>
                        {editedQuestion.code && (
                          <div className="mb-3">
                            <Label className="block text-xs font-medium mb-1">
                              Code
                            </Label>
                            <CodeBlock code={editedQuestion.code} />
                          </div>
                        )}
                        <Textarea
                          id={`edit-question-${index}`}
                          value={editedQuestion.question}
                          onChange={(e) =>
                            setEditedQuestion({
                              ...editedQuestion,
                              question: e.target.value,
                            })
                          }
                          className="w-full min-h-[80px] text-sm transition-all focus:border-primary"
                          autoFocus
                          placeholder="Enter your question here..."
                        />
                      </div>
                      <Button
                        onClick={() => handleSaveQuestion(index)}
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        title="Close and Save"
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col mb-4">
                    <div className="flex items-end justify-end space-x-1 mb-3">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={(e) => handleShowPromptInput(index, e)}
                            variant="ghost"
                            size="icon"
                            className={`h-6 w-6 transition-all duration-200 group ${
                              regeneratingIndex === index
                                ? "bg-accent/20"
                                : "hover:bg-accent/10"
                            }`}
                            disabled={isLoading || regeneratingIndex !== null}
                          >
                            {regeneratingIndex === index ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                            ) : (
                              <RefreshCw className="h-3.5 w-3.5 group-hover:rotate-90 transition-transform duration-300" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                          <p>Regenerate Question</p>
                          <p className="text-xs text-muted-foreground">
                            Shift+Click to regenerate directly
                          </p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={() => handleEditQuestion(index)}
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 hover:bg-accent/10"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                          <p>Edit Question</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={() => handleRemoveQuestion(index)}
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 hover:bg-accent/10"
                          >
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                          <p>Remove Question</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    {showPromptInput === index && (
                      <div
                        className="mb-3 p-3 border rounded-md bg-accent/5 shadow-sm"
                        ref={promptInputRef}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <Label
                            htmlFor={`regenerate-prompt-${index}`}
                            className="text-xs font-medium"
                          >
                            How would you like to improve this question?
                            (optional)
                          </Label>
                          <Button
                            onClick={() => {
                              setShowPromptInput(null);
                              setRegeneratePrompt("");
                            }}
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 -mr-1"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        <Textarea
                          id={`regenerate-prompt-${index}`}
                          value={regeneratePrompt}
                          onChange={(e) => setRegeneratePrompt(e.target.value)}
                          placeholder="E.g., Make it more challenging, focus on React hooks, etc."
                          className="text-sm min-h-[60px] w-full mb-2"
                          ref={textareaRef}
                          onKeyDown={(e) => {
                            // Submit on Ctrl+Enter or Cmd+Enter
                            if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                              handleRegenerateQuestion(index);
                            }
                            // Close on Escape
                            if (e.key === "Escape") {
                              setShowPromptInput(null);
                              setRegeneratePrompt("");
                            }
                          }}
                        />
                        <div className="flex justify-end"></div>
                        <div className="text-xs text-muted-foreground mt-2">
                          Press Ctrl+Enter to regenerate or Esc to cancel
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 w-full overflow-hidden">
                        <p className="text-md font-medium pr-2">{q.question}</p>
                        <div className="w-full overflow-hidden">
                          {q.code && <CodeBlock code={q.code} />}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mb-3 space-y-1">
                  <Label
                    htmlFor={`notes-${index}`}
                    className="block text-xs font-medium"
                  >
                    Notes/Feedback
                  </Label>
                  <Textarea
                    id={`notes-${index}`}
                    value={q.notes || ""}
                    onChange={(e) => {
                      const updatedQuestions = [...questionsList];
                      updatedQuestions[index] = {
                        ...updatedQuestions[index],
                        notes: e.target.value,
                      };
                      setQuestionsList(updatedQuestions);
                    }}
                    className="w-full min-h-[60px] text-sm transition-all focus:border-primary"
                    placeholder="Add notes about the candidate's response..."
                  />
                </div>
              </div>
            ))}


        </div>
      </ScrollArea>
    </div>
  );
}
