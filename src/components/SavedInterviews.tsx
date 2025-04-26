/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SavedInterviewsProps {
  interviews: { [key: string]: any };
  showInterviews: boolean;
}

export function SavedInterviews({
  interviews,
  showInterviews,
}: SavedInterviewsProps) {
  if (!showInterviews || Object.keys(interviews).length === 0) {
    return null;
  }

  return (
    <Card className="w-full max-w-3xl mt-4 shadow-lg rounded-lg overflow-hidden border-border/40 transition-all hover:border-border/80">
      <CardHeader className="p-6 space-y-2">
        <CardTitle className="text-2xl font-bold">
          Saved Interviews
        </CardTitle>
        <CardDescription>
          View your previously saved interview sessions.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="grid gap-4">
          {Object.entries(interviews).map(([timestamp, interviewData]) => (
            <div key={timestamp} className="border p-6 rounded-lg hover:border-border/80 transition-all">
              <h3 className="font-bold text-lg mb-2">
                {new Date(timestamp).toLocaleString()}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <p><span className="font-medium">Candidate:</span> {interviewData.candidateName}</p>
                <p><span className="font-medium">Interviewer:</span> {interviewData.interviewerName}</p>
                <p><span className="font-medium">Role:</span> {interviewData.role}</p>
                <p><span className="font-medium">Experience:</span> {interviewData.yearsOfExperience || "Not specified"} years</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
