import { Button } from "@/components/ui/button";

interface InterviewActionsProps {
  showInterviews: boolean;
  handleShowInterviews: () => void;
  clearAllInterviews: () => void;
}

export function InterviewActions({
  showInterviews,
  handleShowInterviews,
  clearAllInterviews,
}: InterviewActionsProps) {
  return (
    <div className="mt-8 flex flex-col md:flex-row gap-4 md:space-x-4 w-full max-w-3xl">
      <Button
        className="w-full md:w-auto"
        variant="secondary"
        onClick={handleShowInterviews}
        size="lg"
      >
        {showInterviews ? "Hide Interviews" : "View Saved Interviews"}
      </Button>
      <Button
        className="w-full md:w-auto"
        variant="destructive"
        onClick={clearAllInterviews}
        size="lg"
      >
        Clear All Interviews
      </Button>
    </div>
  );
}
