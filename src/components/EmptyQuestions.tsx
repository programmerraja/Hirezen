import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface EmptyQuestionsProps {
  onAddQuestion: () => void;
}

export function EmptyQuestions({ onAddQuestion }: EmptyQuestionsProps) {
  return (
    <Card className="w-full shadow-sm rounded-lg overflow-hidden border-border/40 transition-all hover:border-border/80 mb-6">
      <CardHeader className="p-4 space-y-1">
        
        <CardTitle className="text-lg font-bold">Interview Questions</CardTitle>
        <CardDescription>
          No questions have been generated yet. Generate questions from the
          candidate's resume or add your own.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex flex-col items-center justify-center min-h-[200px]">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            Start by generating questions from the candidate's resume.  
          </p>
          <Button
            onClick={onAddQuestion}
            variant="outline"
            className="flex items-center gap-2"
          >
            Generate Question
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
