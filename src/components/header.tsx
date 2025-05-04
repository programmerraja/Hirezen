import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface HeadersProps {
  startNewInterview: () => void;
  handlePrint?: () => void;
}

export function Header({ startNewInterview, handlePrint }: HeadersProps) {

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex justify-between gap-3 p-3">
        <Button
          className="flex-1 h-10"
          onClick={startNewInterview}
          variant="outline"
        >
          Clear All
        </Button>

        {handlePrint && (
          <Button
            onClick={handlePrint}
            variant="outline"
            className="flex items-center gap-2 h-10 px-4"
          >
            <Printer className="h-5 w-5" />
            Print
          </Button>
        )}
      </div>
    </header>
  );
}
