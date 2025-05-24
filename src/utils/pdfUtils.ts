import * as pdfjsLib from "pdfjs-dist";
import { SyncRedactor } from "redact-pii";
import { jsPDF } from "jspdf";
import { InterviewQuestion, CandidateInfo } from "./openai";

import * as PDFWorker from "pdfjs-dist/build/pdf.worker.mjs";

let workerBlobUrls: string[] = [];

const cleanupWorkerBlobUrls = () => {
  workerBlobUrls.forEach((url) => {
    try {
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Error revoking blob URL:", e);
    }
  });
  workerBlobUrls = [];
};

if (typeof window !== "undefined") {
  window.addEventListener("unload", cleanupWorkerBlobUrls);
}

const setWorkerSrc = () => {
  try {
    const workerCodeString =
      typeof PDFWorker === "string"
        ? PDFWorker
        : `var pdfjsWorker = ${JSON.stringify(PDFWorker)};
         // Initialize the worker global
         self.pdfjsWorker = pdfjsWorker;
         // Execute all exported functions
         for (var key in pdfjsWorker) {
           if (typeof pdfjsWorker[key] === 'function') {
             pdfjsWorker[key]();
           }
         }`;

    const blob = new Blob([workerCodeString], {
      type: "application/javascript",
    });

    const blobUrl = URL.createObjectURL(blob);
    workerBlobUrls.push(blobUrl);
    // Set the worker source to the blob URL
    pdfjsLib.GlobalWorkerOptions.workerSrc = blobUrl;
    console.log("Using embedded PDF.js worker blob");
  } catch (error) {
    console.error("Error setting up embedded PDF worker:", error);
  }
};

setWorkerSrc();

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
    // throw new Error("Failed to extract text from PDF");
    return "";
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
    return "";
  }
}

export interface PrintData {
  interviewerName: string;
  candidateName: string;
  role: string;
  otherNotes?: string;
  selectionStatus: "Selected" | "Rejected" | "";
  finalFeedback?: string;
  questions?: InterviewQuestion[];
  candidateInfo?: CandidateInfo;
}

export const generatePDF = async (data: PrintData): Promise<void> => {
  try {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const LAYOUT = {
      margin: 10,
      pageWidth: 210,
      pageHeight: 297,
      lineHeight: 5,
      sectionSpacing: 8,
      subsectionSpacing: 4,
      itemSpacing: 2,
    };

    const contentWidth = LAYOUT.pageWidth - (LAYOUT.margin * 2);
    const maxY = LAYOUT.pageHeight - LAYOUT.margin;
    let currentY = LAYOUT.margin;

    doc.setFont("helvetica");

    const addNewPage = () => {
      doc.addPage();
      currentY = LAYOUT.margin;
    };

    const checkPageBreak = (requiredSpace: number) => {
      if (currentY + requiredSpace > maxY) {
        addNewPage();
      }
    };

    const addText = (text: string | string[], x: number, options: {
      fontSize?: number;
      fontStyle?: 'normal' | 'bold';
      align?: 'left' | 'center' | 'right';
      spacing?: number;
    } = {}) => {
      const {
        fontSize = 12,
        fontStyle = 'normal',
        align = 'left',
        spacing = LAYOUT.lineHeight
      } = options;

      doc.setFontSize(fontSize);
      doc.setFont("helvetica", fontStyle);

      if (Array.isArray(text)) {
        const totalHeight = text.length * spacing;
        checkPageBreak(totalHeight);

        text.forEach((line, index) => {
          const alignX = align === 'center' ? LAYOUT.pageWidth / 2 :
                        align === 'right' ? LAYOUT.pageWidth - LAYOUT.margin : x;
          doc.text(line, alignX, currentY, { align });
          if (index < text.length - 1) currentY += spacing;
        });
      } else {
        const lines = doc.splitTextToSize(text, contentWidth);
        const totalHeight = lines.length * spacing;
        checkPageBreak(totalHeight);

        lines.forEach((line: string, index: number) => {
          const alignX = align === 'center' ? LAYOUT.pageWidth / 2 :
                        align === 'right' ? LAYOUT.pageWidth - LAYOUT.margin : x;
          doc.text(line, alignX, currentY, { align });
          if (index < lines.length - 1) currentY += spacing;
        });
      }
      currentY += spacing;
    };

    const addSection = (title: string, content: () => void) => {
      currentY += LAYOUT.sectionSpacing;
      addText(title, LAYOUT.margin, { fontSize: 16, fontStyle: 'bold' });
      currentY += LAYOUT.subsectionSpacing;
      content();
    };

    const addSubsection = (title: string, content: string | string[]) => {
      addText(title, LAYOUT.margin, { fontSize: 12, fontStyle: 'bold' });
      currentY += LAYOUT.itemSpacing;
      addText(content, LAYOUT.margin, { fontSize: 12 });
      currentY += LAYOUT.subsectionSpacing;
    };

    addText(data.candidateName, LAYOUT.margin, {
      fontSize: 20,
      fontStyle: 'bold',
      align: 'center',
      spacing: 8
    });

    addText(new Date().toLocaleDateString(), LAYOUT.margin, {
      fontSize: 12,
      align: 'center',
      spacing: 6
    });

    addSection("Interview Details", () => {
      const details = [
        `Interviewer: ${data.interviewerName}`,
        `Candidate: ${data.candidateName}`,
        `Role: ${data.role}`
      ];

      if (data.selectionStatus) {
        details.push(`Status: ${data.selectionStatus}`);
      }

      details.forEach(detail => {
        addText(detail, LAYOUT.margin, { spacing: LAYOUT.lineHeight });
      });
    });

    if (data.candidateInfo) {
      addSection("Candidate Profile", () => {
        if (data.candidateInfo!.summary) {
          addSubsection("Summary", data.candidateInfo!.summary);
        }

        if (data.candidateInfo!.experience?.length) {
          addText("Experience:", LAYOUT.margin, { fontStyle: 'bold' });
          currentY += LAYOUT.itemSpacing;
          data.candidateInfo!.experience.forEach((exp, index) => {
            addText(`• ${exp}`, LAYOUT.margin + 5, { spacing: LAYOUT.lineHeight });
            if (index < data.candidateInfo!.experience!.length - 1) {
              currentY += LAYOUT.itemSpacing;
            }
          });
          currentY += LAYOUT.subsectionSpacing;
        }

        if (data.candidateInfo!.skills?.length) {
          addSubsection("Skills", data.candidateInfo!.skills.join(", "));
        }

        if (data.candidateInfo!.education?.length) {
          addText("Education:", LAYOUT.margin, { fontStyle: 'bold' });
          currentY += LAYOUT.itemSpacing;
          data.candidateInfo!.education.forEach((edu, index) => {
            addText(`• ${edu}`, LAYOUT.margin + 5, { spacing: LAYOUT.lineHeight });
            if (index < data.candidateInfo!.education!.length - 1) {
              currentY += LAYOUT.itemSpacing;
            }
          });
          currentY += LAYOUT.subsectionSpacing;
        }

        if (data.candidateInfo!.projects?.length) {
          addText("Projects:", LAYOUT.margin, { fontStyle: 'bold' });
          currentY += LAYOUT.itemSpacing;
          data.candidateInfo!.projects.forEach((project, index) => {
            addText(`• ${project}`, LAYOUT.margin + 5, { spacing: LAYOUT.lineHeight });
            if (index < data.candidateInfo!.projects!.length - 1) {
              currentY += LAYOUT.itemSpacing;
            }
          });
          currentY += LAYOUT.subsectionSpacing;
        }
      });
    }

    if (data.questions?.length) {
      addSection("Interview Questions", () => {
        data.questions!.forEach((question, index) => {
          const questionLines = doc.splitTextToSize(question.question.trim(), contentWidth);
          const codeLines = question.code ? doc.splitTextToSize(question.code.trim(), contentWidth) : [];
          const notesLines = question.notes ? doc.splitTextToSize(question.notes.trim(), contentWidth) : [];

          const requiredSpace =
            (questionLines.length * LAYOUT.lineHeight) +
            (codeLines.length * LAYOUT.lineHeight) +
            (notesLines.length * LAYOUT.lineHeight) +
            LAYOUT.subsectionSpacing * 3;

          checkPageBreak(requiredSpace);

          addText(`Q${index + 1}: ${question.question.trim()}`, LAYOUT.margin, {
            fontStyle: 'bold',
            spacing: LAYOUT.lineHeight
          });

          if (question.code) {
            currentY += LAYOUT.itemSpacing;
            doc.setFontSize(10);
            doc.setFont("courier", "normal");
            const codeLines = doc.splitTextToSize(question.code.trim(), contentWidth);
            codeLines.forEach((line: string) => {
              doc.text(line, LAYOUT.margin + 5, currentY);
              currentY += 4;
            });
            currentY += LAYOUT.itemSpacing;
          }

       
          if (question.notes) {
            addText("Feedback:", LAYOUT.margin, { fontStyle: 'bold', spacing: LAYOUT.lineHeight });
            addText(question.notes.trim(), LAYOUT.margin + 5, { spacing: LAYOUT.lineHeight });
          }

          if (index < data.questions!.length - 1) {
            currentY += LAYOUT.sectionSpacing;
          }
        });
      });
    }

    if (data.finalFeedback) {
      addSection("Final Feedback", () => {
        addText(data.finalFeedback!, LAYOUT.margin, { spacing: LAYOUT.lineHeight });
      });
    }

    doc.save(`${data.candidateName || "Candidate"}_Interview_Summary.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};
