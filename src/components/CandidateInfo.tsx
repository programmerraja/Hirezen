import { CandidateInfo as CandidateInfoType } from "@/utils/openai";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CandidateInfoProps {
  candidateInfo?: CandidateInfoType;
  candidateName: string;
  role: string;
}

export function CandidateInfo({
  candidateInfo,
  candidateName,
  role,
}: CandidateInfoProps) {
  if (!candidateInfo) {
    return null;
  }

  return (
    <Card className="w-full shadow-sm rounded-lg overflow-hidden border-border/40 transition-all hover:border-border/80 mb-6">
      <CardHeader className="p-4 space-y-1">
        <CardTitle className="text-lg font-bold flex items-center justify-between">
          <span>Candidate Profile: {candidateName}</span>
          <Badge variant="outline" className="ml-2">
            ~{candidateInfo.yearsOfExperience} years exp.
          </Badge>
        </CardTitle>
        <CardDescription>Role: {role}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="p-4 pt-4">
        <ScrollArea className="pr-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Summary</h3>
              <p className="text-sm text-muted-foreground">
                {candidateInfo.summary}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {candidateInfo.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Experience</h3>
              <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-5">
                {candidateInfo.experience.map((exp, index) => (
                  <li key={index}>{exp}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Education</h3>
              <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-5">
                {candidateInfo.education.map((edu, index) => (
                  <li key={index}>{edu}</li>
                ))}
              </ul>
            </div>

            {candidateInfo.projects.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">Notable Projects</h3>
                <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-5">
                  {candidateInfo.projects.map((project, index) => (
                    <li key={index}>{project}</li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h3 className="text-sm font-medium mb-2">Key Strengths</h3>
              <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-5">
                {candidateInfo.strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Areas to Explore</h3>
              <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-5">
                {candidateInfo.areasToExplore.map((area, index) => (
                  <li key={index}>{area}</li>
                ))}
              </ul>
            </div>
            
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
