import * as pdfjsLib from "pdfjs-dist";
import { SyncRedactor } from "redact-pii";

// Use a direct path for Chrome extension environment
pdfjsLib.GlobalWorkerOptions.workerSrc = "./pdf.worker.js";

export async function extractTextFromPDF(pdfFile: File): Promise<string> {
  try {
    const arrayBuffer = await pdfFile.arrayBuffer();

    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    const numPages = pdf.numPages;
    let fullText = "";

    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map((item) => ("str" in item ? item.str : ""))
        .join(" ");

      fullText += pageText + "\n\n";
    }

    return fullText;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw new Error("Failed to extract text from PDF");
  }
}

export function removePersonalInfo(text: string): string {
  try {
    const redactor = new SyncRedactor();

    const redactedText = redactor.redact(text);

    return redactedText;
  } catch (error) {
    console.error("Error removing personal information:", error);
    return text;
  }
}

export async function processPDF(pdfFile: File): Promise<string> {
  try {
    const extractedText = await extractTextFromPDF(pdfFile);

    const redactedText = removePersonalInfo(extractedText);

    return redactedText;
  } catch (error) {
    console.error("Error processing PDF:", error);
    throw new Error("Failed to process PDF");
  }
}
