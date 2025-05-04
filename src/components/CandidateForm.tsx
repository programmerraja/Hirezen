import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileUp, Loader2 } from "lucide-react";
import { useInterview } from "@/contexts/InterviewContext";

export function CandidateForm() {
  const { interviewData, updateInterviewData, isLoading, generateQuestions } =
    useInterview();

  const { interviewerName, candidateName, role, resumePreview, otherNotes } =
    interviewData;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      updateInterviewData({
        resumeFile: file,
        resumePreview: file.name,
      });
    }
  };

  return (
    <Card className="w-full shadow-sm rounded-lg overflow-hidden border-border/40 transition-all hover:border-border/80 pd-0">
      <CardHeader className="p-4 space-y-1">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">
            Candidate Information
          </CardTitle>
        </div>
        <CardDescription className="text-sm">
          Enter the candidate details to generate interview questions.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 grid gap-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="space-y-1">
            <Label htmlFor="interviewerName" className="text-sm">
              Interviewer Name
            </Label>
            <Input
              id="interviewerName"
              type="text"
              placeholder="Enter your name"
              value={interviewerName}
              onChange={(e) =>
                updateInterviewData({ interviewerName: e.target.value })
              }
              className="transition-all focus:border-primary h-8 text-sm"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="candidateName" className="text-sm">
              Candidate Name
            </Label>
            <Input
              id="candidateName"
              type="text"
              placeholder="Enter candidate name"
              value={candidateName}
              onChange={(e) =>
                updateInterviewData({ candidateName: e.target.value })
              }
              className="transition-all focus:border-primary h-8 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div className="space-y-1">
            <Label htmlFor="role" className="text-sm">
              Role/Interview Round
            </Label>
            <Input
              id="role"
              type="text"
              placeholder="e.g. Frontend Developer"
              value={role}
              onChange={(e) => updateInterviewData({ role: e.target.value })}
              className="transition-all focus:border-primary h-8 text-sm"
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="resume" className="text-sm">
            Resume Upload
          </Label>
          <div className="flex items-center">
            <Input
              id="resume"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
            <div
              className="border rounded-md p-3 w-full flex items-center justify-center cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => document.getElementById("resume")?.click()}
            >
              <div className="flex flex-col items-center gap-1">
                <FileUp className="h-6 w-6 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {resumePreview ? resumePreview : "Click to upload resume"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="otherNotes" className="text-sm">
            Other Notes (optional)
          </Label>
          <Textarea
            id="otherNotes"
            placeholder="Add any additional notes about the candidate or interview"
            value={otherNotes}
            onChange={(e) =>
              updateInterviewData({ otherNotes: e.target.value })
            }
            className="min-h-[80px] text-sm transition-all focus:border-primary"
          />
        </div>

        <Button
          className="w-full mt-2"
          onClick={generateQuestions}
          disabled={isLoading}
          size="sm"
          variant={"outline"}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-3 w-3 animate-spin" />
              Generating Questions...
            </>
          ) : (
            "Start the Interview"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
