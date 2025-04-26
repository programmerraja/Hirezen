// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import html2pdf from "html2pdf.js";

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

export const generateInterviewPDF = async (data: PrintData): Promise<void> => {
  try {
    const container = document.createElement("div");

    container.style.cssText = `
      padding: 20px;
      font-family: Arial, sans-serif;
      background-color: white;
      color: black;
    `;

    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="margin-bottom: 5px; font-size: 24px; color: black;">Interview Summary</h1>
        <p style="color: #666666; margin-top: 0; font-size: 14px;">Generated on ${new Date().toLocaleDateString()}</p>
      </div>

      <div style="margin-bottom: 20px; border: 1px solid #eeeeee; padding: 15px; border-radius: 5px; background-color: white;">
        <h2 style="margin-top: 0; border-bottom: 1px solid #eeeeee; padding-bottom: 10px; font-size: 18px; color: black;">Interview Details</h2>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="width: 40%; font-weight: bold; padding: 5px 0; color: black;">Interviewer:</td>
            <td style="width: 60%; padding: 5px 0; color: black;">${
              data.interviewerName || "N/A"
            }</td>
          </tr>
          <tr>
            <td style="width: 40%; font-weight: bold; padding: 5px 0; color: black;">Candidate:</td>
            <td style="width: 60%; padding: 5px 0; color: black;">${
              data.candidateName || "N/A"
            }</td>
          </tr>
          <tr>
            <td style="width: 40%; font-weight: bold; padding: 5px 0; color: black;">Role:</td>
            <td style="width: 60%; padding: 5px 0; color: black;">${
              data.role || "N/A"
            }</td>
          </tr>
          ${
            data.otherNotes
              ? `
          <tr>
            <td style="width: 40%; font-weight: bold; padding: 5px 0; color: black;">Additional Notes:</td>
            <td style="width: 60%; padding: 5px 0; color: black;">${
              data.otherNotes
            }</td>
          </tr>
          <tr>
          <td>Decision: </td>
          <td style="border-top: 1px solid #eeeeee; padding-top: 10px;">${
            data.selectionStatus === "Selected"
              ? '<span style="color: #22c55e; font-weight: bold;">Selected</span>'
              : data.selectionStatus === "Rejected"
              ? '<span style="color: #ef4444; font-weight: bold;">Rejected</span>'
              : "No decision recorded"
          }</td>
          </tr>
          `
              : ""
          }
        </table>
      </div>

      ${
        data.questions && data.questions.length > 0
          ? `
      <div style="margin-bottom: 20px; border: 1px solid #eeeeee; padding: 15px; border-radius: 5px; background-color: white;">
        <h2 style="margin-top: 0; border-bottom: 1px solid #eeeeee; padding-bottom: 10px; font-size: 18px; color: black;">Interview Questions</h2>

        ${data.questions
          .map(
            (q) => `
          <div style="margin-bottom: 15px;">
           
            <p style="margin-top: 0; margin-bottom: 10px; color: black;">${
              q.question
            }</p>

            ${
              q.notes
                ? `
              <div style="margin-left: 15px;">
                <h4 style="margin-top: 5px; margin-bottom: 5px; font-size: 14px; color: black;">Feedback:</h4>
                <p style="margin-top: 0; color: black;">${q.notes}</p>
              </div>
            `
                : ""
            }
          </div>
        `
          )
          .join("")}
      </div>
      `
          : ""
      }

      ${
        data.finalFeedback
          ? `
      <div style="margin-bottom: 20px; border: 1px solid #eeeeee; padding: 15px; border-radius: 5px; background-color: white;">
        <h2 style="margin-top: 0; border-bottom: 1px solid #eeeeee; padding-bottom: 10px; font-size: 18px; color: black;">Final Feedback</h2>
        <p style="color: black;">${data.finalFeedback}</p>
      </div>
      `
          : ""
      }
    `;

    document.body.appendChild(container);

    const options = {
      margin: 10,
      filename: `${data.candidateName || "Candidate"}_Interview_Summary.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: "#ffffff",
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        compress: true,
      },
    };

    await html2pdf().from(container).set(options).save();

    document.body.removeChild(container);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};
