import { useState, useRef, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/ui/code-block";
import { InterviewQuestion } from "@/utils/openai";
import { ArrowLeft, Plus, Edit, X, Check, X as XIcon } from "lucide-react";
import { useInterview } from "@/contexts/InterviewContext";

export function InterviewQuestions() {
  const { interviewData, updateInterviewData, setPage } = useInterview();

  const { questions, selectionStatus, finalFeedback } = interviewData;

  const [questionsList, setQuestionsList] =
    useState<InterviewQuestion[]>(questions);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedQuestion, setEditedQuestion] = useState<InterviewQuestion>({
    question: "",
  });

  const editRef = useRef<HTMLDivElement>(null);

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
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editingIndex, handleSaveQuestion]);

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

  const goBackToCandidateInfo = () => setPage(1);

  return (
    <div className="w-full h-[85vh] relative">
      <Button
        onClick={handleAddQuestion}
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-full shadow-md absolute top-2 right-4 z-20 bg-background hover:bg-accent/10 border border-border/50"
        title="Add New Question"
      >
        <Plus className="h-4 w-4" />
      </Button>

      <ScrollArea className="flex-1 w-full rounded-md border h-[calc(100%-40px)]">
        <div className="sticky top-0 bg-background z-10 flex justify-between items-center p-2">
          <Button
            onClick={goBackToCandidateInfo}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            title="Back to Candidate Info"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-col gap-6 p-4 w-full max-w-[490px]">
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
                     <div className="flex items-end justify-end space-x-1 mb-3 ">
                        <Button
                          onClick={() => handleEditQuestion(index)}
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 "
                          title="Edit Question"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          onClick={() => handleRemoveQuestion(index)}
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          title="Remove Question"
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 w-full overflow-hidden">
                        <p className="text-md font-medium pr-2">{q.question}</p>
                        <div className="w-full overflow-hidden">{q.code && <CodeBlock code={q.code} />}</div>
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

          <Separator className="my-1" />

          <div className="mt-1 border rounded-lg p-4 shadow-sm hover:border-border/80 transition-all bg-accent/5 w-full">
            <div className="flex flex-col mb-4">
              <h3 className="text-lg font-semibold mb-2">Final Feedback</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Provide your overall assessment of the candidate based on the
                interview
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="final-feedback" className="text-sm font-medium">
                  Overall Feedback
                </Label>
                <Textarea
                  id="final-feedback"
                  value={finalFeedback}
                  onChange={(e) =>
                    updateInterviewData({ finalFeedback: e.target.value })
                  }
                  className="w-full min-h-[120px] text-sm transition-all focus:border-primary"
                  placeholder="Enter your comprehensive feedback about the candidate's performance across all questions..."
                />
              </div>

              <div className="space-y-2 mt-6">
                {/* <Label
                  htmlFor="selection-status"
                  className="text-sm font-medium"
                >
                  Selection Decision
                </Label> */}
                <div className="flex gap-2 mt-2">
                  <Button
                    onClick={() =>
                      updateInterviewData({ selectionStatus: "Selected" })
                    }
                    variant="outline"
                    size="sm"
                    className={`flex-1 ${
                      selectionStatus === "Selected"
                        ? "!bg-green-500 !hover:bg-green-500"
                        : ""
                    }`}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Selected
                  </Button>
                  <Button
                    onClick={() =>
                      updateInterviewData({ selectionStatus: "Rejected" })
                    }
                    variant="outline"
                    size="sm"
                    className={`flex-1 ${
                      selectionStatus === "Rejected"
                        ? "!bg-red-500 !hover:bg-red-500"
                        : ""
                    }`}
                  >
                    <XIcon className="h-4 w-4 mr-1" />
                    Rejected
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
