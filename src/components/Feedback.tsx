import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X as XIcon } from "lucide-react";
import { useInterview } from "@/contexts/InterviewContext";
import { SelectionStatus } from "@/contexts/InterviewContext";

export function Feedback() {
  const { interviewData, updateInterviewData } = useInterview();
  const { finalFeedback, selectionStatus } = interviewData;

  return (
    <Card className="w-full shadow-sm rounded-lg overflow-hidden border-border/40 transition-all hover:border-border/80 mb-6">
      <CardHeader className="p-4 space-y-1">
        <CardTitle className="text-lg font-bold">Final Feedback</CardTitle>
        <CardDescription>
          Provide your overall assessment of the candidate based on the interview
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="final-feedback" className="text-sm font-medium">
            Overall Feedback
          </Label>
          <Textarea
            id="final-feedback"
            value={finalFeedback}
            onChange={(e) => updateInterviewData({ finalFeedback: e.target.value })}
            className="w-full min-h-[120px] text-sm transition-all focus:border-primary"
            placeholder="Enter your comprehensive feedback about the candidate's performance across all questions..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="selection-status" className="text-sm font-medium">
            Selection Decision
          </Label>
          <div className="flex gap-2 mt-2">
            <Button
              onClick={() => updateInterviewData({ selectionStatus: "Selected" })}
              variant="outline"
              size="sm"
              className={`flex-1 ${
                selectionStatus === "Selected" ? "!bg-green-500 !hover:bg-green-500" : ""
              }`}
            >
              <Check className="h-4 w-4 mr-1" />
              Selected
            </Button>
            <Button
              onClick={() => updateInterviewData({ selectionStatus: "Rejected" })}
              variant="outline"
              size="sm"
              className={`flex-1 ${
                selectionStatus === "Rejected" ? "!bg-red-500 !hover:bg-red-500" : ""
              }`}
            >
              <XIcon className="h-4 w-4 mr-1" />
              Rejected
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
