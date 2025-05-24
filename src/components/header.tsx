import { useState } from "react";
import { Button } from "@/components/ui/button";
// Maximize2, Minimize2, Monitor
import { Printer, Settings,  } from "lucide-react";
import { SettingsModal } from "@/components/SettingsModal";

interface HeadersProps {
  startNewInterview: () => void;
  handlePrint?: () => void;
}

export function Header({ startNewInterview, handlePrint }: HeadersProps) {
  const [showSettings, setShowSettings] = useState(false);

  // Width control functions
  // const setWidth = (width: number) => {
  //   if (window.updateExtensionWidth) {
  //     window.updateExtensionWidth(width);
  //   }
  // };

  // const getConstraints = () => {
  //   if (window.getExtensionConstraints) {
  //     return window.getExtensionConstraints();
  //   }
  //   return { MIN_WIDTH: 300, MAX_WIDTH: 1200, DEFAULT_WIDTH: 690 };
  // };

  // const constraints = getConstraints();

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex justify-between gap-3 p-3">
          <Button
            className="flex-1 h-10"
            onClick={startNewInterview}
            variant="outline"
          >
            Clear All
          </Button>

          <div className="flex gap-2">
            {/* Width control buttons */}
            {/* <Button
              onClick={() => setWidth(constraints.MIN_WIDTH)}
              variant="outline"
              size="icon"
              className="h-10 w-10"
              title="Narrow width"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>

            <Button
              onClick={() => setWidth(constraints.DEFAULT_WIDTH)}
              variant="outline"
              size="icon"
              className="h-10 w-10"
              title="Default width"
            >
              <Monitor className="h-4 w-4" />
            </Button>

            <Button
              onClick={() => setWidth(constraints.MAX_WIDTH)}
              variant="outline"
              size="icon"
              className="h-10 w-10"
              title="Wide width"
            >
              <Maximize2 className="h-4 w-4" />
            </Button> */}

            <Button
              onClick={() => setShowSettings(true)}
              variant="outline"
              size="icon"
              className="h-10 w-10"
              title="Settings"
            >
              <Settings className="h-5 w-5" />
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
        </div>
      </header>

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </>
  );
}
