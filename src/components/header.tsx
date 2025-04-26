import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface HeadersProps {
  startNewInterview: () => void;
  handlePrint?: () => void;
}

export function Header({ startNewInterview, handlePrint }: HeadersProps) {

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mt-4 flex justify-between gap-2 p-2">
        <Button
          className="flex-1"
          onClick={startNewInterview}
          variant="outline"
          size="sm"
        >
          Clear All
        </Button>

        {handlePrint && (
          <Button
            onClick={handlePrint}
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Printer className="h-4 w-4" />
            Print
          </Button>
        )}
      </div>
    </header>
  );
}
