import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { processPDF } from "@/utils/pdfUtils";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface PDFTextViewerProps {
  pdfFile: File | null;
}

export function PDFTextViewer({ pdfFile }: PDFTextViewerProps) {
  const [extractedText, setExtractedText] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleExtractText = async () => {
    if (!pdfFile) {
      toast.error("Please upload a PDF file first");
      return;
    }

    // Check if the file is a PDF
    if (!pdfFile.type.includes("pdf")) {
      toast.error(
        "Please upload a PDF file. The current file type is: " + pdfFile.type
      );
      return;
    }

    setIsProcessing(true);
    try {
      const processedText = await processPDF(pdfFile);
      setExtractedText(processedText);
      toast.success("Text extracted and personal information removed");
    } catch (error) {
      console.error("Error processing PDF:", error);
      toast.error(
        "Failed to process PDF: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopyText = () => {
    if (extractedText) {
      navigator.clipboard.writeText(extractedText);
      toast.success("Text copied to clipboard");
    }
  };

  return (
    <Card className="w-full max-w-3xl shadow-lg rounded-lg overflow-hidden border-border/40 transition-all hover:border-border/80 mt-4">
      <CardHeader className="p-6 space-y-2">
        <CardTitle className="text-2xl font-bold">PDF Text Extractor</CardTitle>
        <CardDescription>
          Extract text from PDF and remove personal information like phone
          numbers, emails, etc.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0 grid gap-6">
        <div className="flex gap-4">
          <Button
            onClick={handleExtractText}
            disabled={isProcessing || !pdfFile}
            className="flex-1"
            variant="outline"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing PDF...
              </>
            ) : (
              "Extract & Redact Text"
            )}
          </Button>
          <Button
            onClick={handleCopyText}
            disabled={!extractedText}
            className="flex-1"
            variant="outline"
          >
            Copy to Clipboard
          </Button>
        </div>

        {pdfFile && !pdfFile.type.includes("pdf") && (
          <div className="p-4 border border-destructive/50 bg-destructive/10 rounded-md text-destructive">
            Warning: The uploaded file does not appear to be a PDF. Current file
            type: {pdfFile.type || "unknown"}
          </div>
        )}

        {extractedText ? (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Extracted text with personal information removed:
              </p>
              <p className="text-xs text-muted-foreground">
                {extractedText.length} characters
              </p>
            </div>
            <Textarea
              value={extractedText}
              readOnly
              className="min-h-[300px] font-mono text-sm"
            />
          </div>
        ) : (
          <div className="p-4 border border-border rounded-md bg-muted/20 text-center">
            <p className="text-muted-foreground">
              Click "Extract & Redact Text" to process the PDF and remove
              personal information
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
