import { jsPDF } from "jspdf";
import { InterviewQuestion } from "./openai";

export interface PrintData {
  interviewerName: string;
  candidateName: string;
  role: string;
  otherNotes?: string;
  selectionStatus: "Selected" | "Rejected" | "";
  finalFeedback?: string;
  questions?: InterviewQuestion[];
}

export const generateInterviewPDFDirect = async (
  data: PrintData
): Promise<void> => {
  try {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    doc.setFont("helvetica");

    doc.setFontSize(24);
    doc.text(data.candidateName, 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`${new Date().toLocaleDateString()}`, 105, 28, {
      align: "center",
    });

    doc.setTextColor(0, 0, 0);

    doc.setFontSize(18);
    doc.text("Interview Details", 20, 45);

    doc.setDrawColor(200, 200, 200);
    doc.line(20, 48, 190, 48);

    doc.setFontSize(12);
    let yPos = 55;

    doc.setFont("helvetica", "bold");
    doc.text("Interviewer:", 20, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(data.interviewerName || "N/A", 80, yPos);
    yPos += 10;

    doc.setFont("helvetica", "bold");
    // doc.text("Candidate:", 20, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(data.candidateName || "N/A", 80, yPos);
    yPos += 10;

    doc.setFont("helvetica", "bold");
    doc.text("Role:", 20, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(data.role || "N/A", 80, yPos);
    yPos += 10;

    if (data.selectionStatus) {
      doc.setFont("helvetica", "bold");
      doc.text("Status:", 20, yPos);
      doc.setFont("helvetica", "normal");

      const splitNotes = doc.splitTextToSize(data.selectionStatus, 110);
      doc.text(splitNotes, 80, yPos);
      yPos += 10 + (splitNotes.length - 1) * 7;
    }

    if (data.questions && data.questions.length > 0) {
      yPos += 10;

      doc.setFontSize(18);
      doc.text("Interview Questions", 20, yPos);
      yPos += 3;

      doc.line(20, yPos, 190, yPos);
      yPos += 7;

      doc.setFontSize(12);

      data.questions.forEach((q) => {
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }

        // doc.setFont("helvetica", "bold");
        // doc.text(`Question ${index + 1}:`, 20, yPos);
        doc.setFont("helvetica", "normal");

        const splitQuestion = doc.splitTextToSize(q.question, 170);
        doc.text(splitQuestion, 20, yPos + 7);
        yPos += splitQuestion.length * 7 + 7;

        if (q.notes) {
          if (yPos > 250) {
            doc.addPage();
            yPos = 20;
          }

          doc.setFont("helvetica", "bold");
          doc.text("Feedback:", 20, yPos);
          doc.setFont("helvetica", "normal");

          const splitNotes = doc.splitTextToSize(q.notes, 170);
          doc.text(splitNotes, 20, yPos + 7);
          yPos += splitNotes.length * 7 + 10;
        } else {
          yPos += 10;
        }
      });
    }

    if (data.finalFeedback) {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }

      yPos += 10;

      doc.setFontSize(18);
      doc.text("Final Feedback", 20, yPos);
      yPos += 3;

      doc.line(20, yPos, 190, yPos);
      yPos += 7;

      doc.setFontSize(12);
      const splitFeedback = doc.splitTextToSize(data.finalFeedback, 170);
      doc.text(splitFeedback, 20, yPos);
      yPos += splitFeedback.length * 7; // Adjust position based on number of lines
    }

    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    yPos += 10;

    // Save the PDF
    doc.save(`${data.candidateName || "Candidate"}_Interview_Summary.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};
