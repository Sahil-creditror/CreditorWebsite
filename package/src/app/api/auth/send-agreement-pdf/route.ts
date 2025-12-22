import { NextRequest, NextResponse } from "next/server";
import { jsPDF } from "jspdf";
import nodemailer from "nodemailer";
import { FULL_AGREEMENT_SECTIONS, CERTIFICATION_TEXT, AgreementSection } from "./agreement-full-text";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userName, userEmail, signature, signedAt, signatureType, typedSignature, selectedFont } = body;

    if (!userName || !userEmail || !signature) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate PDF
    const pdfBuffer = await generateAgreementPDF({
      userName,
      userEmail,
      signature,
      signedAt: signedAt || new Date().toISOString(),
      signatureType: signatureType || "draw",
      typedSignature: typedSignature || "",
      selectedFont: selectedFont || "Dancing Script",
    });

    // Send email with PDF attachment
    await sendEmail({
      to: userEmail,
      subject: "Your Tradeline User Agreement - Signed Copy",
      text: `Dear ${userName},\n\nThank you for signing the Tradeline User Agreement. Please find your signed copy attached to this email.\n\nBest regards,\nTradeline Exchange`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Tradeline User Agreement - Signed Copy</h2>
          <p>Dear ${userName},</p>
          <p>Thank you for signing the Tradeline User Agreement. Please find your signed copy attached to this email.</p>
          <p>This document serves as your official record of the agreement.</p>
          <p>Best regards,<br>Tradeline Exchange</p>
        </div>
      `,
      attachments: [
        {
          filename: `Tradeline-User-Agreement-${userName.replace(/\s+/g, "-")}-${Date.now()}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    return NextResponse.json(
      {
        message: "Agreement PDF sent successfully",
        email: userEmail,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error sending agreement PDF:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// Generate PDF with agreement content using jsPDF
async function generateAgreementPDF(data: {
  userName: string;
  userEmail: string;
  signature: string;
  signedAt: string;
  signatureType?: string;
  typedSignature?: string;
  selectedFont?: string;
}): Promise<Buffer> {
  try {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "letter",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPos = margin;

    // Helper function to add text with word wrap
    const addText = (text: string, fontSize: number, x: number, y: number, maxWidth?: number) => {
      doc.setFontSize(fontSize);
      const lines = doc.splitTextToSize(text, maxWidth || pageWidth - 2 * margin);
      doc.text(lines, x, y);
      return lines.length * (fontSize * 0.4) + 5; // Return height used
    };

    // Header
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    const titleWidth = doc.getTextWidth("TRADELINE USER AGREEMENT");
    doc.text("TRADELINE USER AGREEMENT", (pageWidth - titleWidth) / 2, yPos);
    yPos += 15;

    // Signer Information
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    yPos += addText(`Signed by: ${data.userName}`, 12, margin, yPos);
    yPos += addText(`Email: ${data.userEmail}`, 12, margin, yPos);
    yPos += addText(`Date: ${new Date(data.signedAt).toLocaleString()}`, 12, margin, yPos);
    yPos += 10;

    // Helper function to check and add new page if needed
    const checkPageBreak = (requiredSpace: number = 40) => {
      if (yPos > pageHeight - requiredSpace) {
        doc.addPage();
        yPos = margin;
      }
    };

    // Helper function to draw a table
    const drawTable = (headers: string[], rows: string[][], startY: number) => {
      const tableWidth = pageWidth - 2 * margin;
      const colCount = headers.length;
      const colWidth = tableWidth / colCount;
      const rowHeight = 15;
      let currentY = startY;

      // Draw header
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setFillColor(240, 240, 240);
      doc.rect(margin, currentY, tableWidth, rowHeight, "F");
      
      headers.forEach((header, colIndex) => {
        const x = margin + colIndex * colWidth;
        const lines = doc.splitTextToSize(header, colWidth - 4);
        doc.text(lines, x + 2, currentY + 5);
      });
      currentY += rowHeight;

      // Draw rows
      doc.setFont("helvetica", "normal");
      rows.forEach((row) => {
        checkPageBreak(rowHeight + 5);
        if (currentY > pageHeight - rowHeight - 10) {
          doc.addPage();
          currentY = margin;
        }
        
        // Draw row border
        doc.setDrawColor(200, 200, 200);
        doc.rect(margin, currentY, tableWidth, rowHeight, "S");
        
        row.forEach((cell, colIndex) => {
          const x = margin + colIndex * colWidth;
          const lines = doc.splitTextToSize(cell, colWidth - 4);
          doc.text(lines, x + 2, currentY + 5);
        });
        currentY += rowHeight;
      });

      return currentY - startY;
    };

    // Agreement Content - Add ALL sections from full agreement
    doc.setFontSize(10);
    
    FULL_AGREEMENT_SECTIONS.forEach((section) => {
      checkPageBreak(40);

      // Section title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      yPos += addText(section.title, 10, margin, yPos);
      yPos += 3;

      // Main content if exists
      if (section.content) {
        doc.setFont("helvetica", "normal");
        const contentHeight = addText(section.content, 10, margin, yPos, pageWidth - 2 * margin);
        yPos += contentHeight + 5;
      }

      // Subsections
      if (section.subsections) {
        section.subsections.forEach((subsection) => {
          checkPageBreak(30);
          
          if (subsection.title) {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            yPos += addText(subsection.title, 9, margin, yPos);
            yPos += 2;
          }
          
          if (subsection.content) {
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            const subHeight = addText(subsection.content, 9, margin, yPos, pageWidth - 2 * margin);
            yPos += subHeight + 3;
          }
        });
      }

      // Lists
      if (section.listItems) {
        section.listItems.forEach((list) => {
          checkPageBreak(30);
          
          list.items.forEach((item, index) => {
            checkPageBreak(15);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            const prefix = list.type === "ordered" ? `${index + 1}. ` : "• ";
            const itemText = prefix + item;
            const itemHeight = addText(itemText, 9, margin + 5, yPos, pageWidth - 2 * margin - 5);
            yPos += itemHeight + 2;
          });
          yPos += 3;
        });
      }

      // Table
      if (section.table) {
        checkPageBreak(100);
        const tableHeight = drawTable(section.table.headers, section.table.rows, yPos);
        yPos += tableHeight + 5;
      }

      yPos += 3; // Space between sections
    });

    // Certification
    if (yPos > pageHeight - 50) {
      doc.addPage();
      yPos = margin;
    }
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    yPos += addText("CERTIFICATION", 10, margin, yPos);
    yPos += 3;
    doc.setFont("helvetica", "bold");
    const certHeight = addText(CERTIFICATION_TEXT, 10, margin, yPos, pageWidth - 2 * margin);
    yPos += certHeight + 10;

    // Signature section
    if (yPos > pageHeight - 60) {
      doc.addPage();
      yPos = margin;
    }
    doc.setFont("helvetica", "bold");
    yPos += addText("Digital Signature:", 10, margin, yPos);
    yPos += 5;

    if (data.signatureType === "type" && data.typedSignature) {
      // For typed signatures, render as text
      doc.setFontSize(18);
      doc.setFont("helvetica", "normal");
      yPos += addText(data.typedSignature, 18, margin, yPos);
    } else {
      // Convert base64 signature to image (for drawn signatures)
      try {
        const signatureData = data.signature.split(",")[1] || data.signature;
        const signatureBuffer = Buffer.from(signatureData, "base64");
        
        // Add image to PDF
        const imgData = `data:image/png;base64,${signatureData}`;
        doc.addImage(imgData, "PNG", margin, yPos, 80, 30);
        yPos += 35;
      } catch (err) {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        yPos += addText("Signature: [Digital Signature Provided]", 10, margin, yPos);
      }
    }

    yPos += 10;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    yPos += addText(`Name: ${data.userName}`, 10, margin, yPos);
    yPos += addText(`Email: ${data.userEmail}`, 10, margin, yPos);
    yPos += addText(`Date: ${new Date(data.signedAt).toLocaleString()}`, 10, margin, yPos);

    // Generate PDF as buffer
    const pdfOutput = doc.output("arraybuffer");
    return Buffer.from(pdfOutput);
  } catch (error: any) {
    console.error("PDF generation error:", error);
    throw new Error(`Failed to generate PDF: ${error.message}`);
  }
}

// Send email with PDF attachment
async function sendEmail(data: {
  to: string;
  subject: string;
  text: string;
  html?: string;
  attachments?: Array<{ filename: string; content: Buffer }>;
}) {
  // Configure email transporter
  // You can use environment variables for SMTP configuration
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER || process.env.EMAIL_USER,
      pass: process.env.SMTP_PASS || process.env.EMAIL_PASSWORD,
    },
  });

  // If no SMTP configured, log and return (for development)
  if (!process.env.SMTP_USER && !process.env.EMAIL_USER) {
    console.log("═══════════════════════════════════════════════════");
    console.log("📧 EMAIL TEST MODE (SMTP not configured)");
    console.log("═══════════════════════════════════════════════════");
    console.log("To:", data.to);
    console.log("Subject:", data.subject);
    console.log("Attachments:", data.attachments?.length || 0);
    if (data.attachments && data.attachments.length > 0) {
      console.log("PDF Filename:", data.attachments[0].filename);
      console.log("PDF Size:", (data.attachments[0].content.length / 1024).toFixed(2), "KB");
    }
    console.log("═══════════════════════════════════════════════════");
    console.log("⚠️  To actually send emails, add to .env.local:");
    console.log("   SMTP_USER=your-email@gmail.com");
    console.log("   SMTP_PASS=your-app-password");
    console.log("═══════════════════════════════════════════════════");
    return;
  }

  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.SMTP_USER || "noreply@tradelinesupply.com",
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.html || data.text,
    attachments: data.attachments || [],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");
    console.log("Message ID:", info.messageId);
    console.log("To:", data.to);
  } catch (error: any) {
    console.error("❌ Email sending failed:");
    console.error("Error:", error.message);
    if (error.code === "EAUTH") {
      console.error("⚠️  Authentication failed. Check your SMTP_USER and SMTP_PASS in .env.local");
      console.error("⚠️  Make sure you're using Gmail App Password, not regular password!");
    }
    throw error;
  }
}
