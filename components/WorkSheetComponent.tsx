'use client';

import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface WorkSheetComponentProps {
  worksheet: string; 
}

const WorkSheetComponent = ({ worksheet }: WorkSheetComponentProps) => {
  const worksheetRef = useRef<HTMLDivElement>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const formatWorksheetContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => (
      <p key={index} className="mb-4 last:mb-0">
        {paragraph || <br />}
      </p>
    ));
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(worksheet);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

const downloadAsPDF = async () => {
  if (!worksheetRef.current) return;

  // Create an iframe to sandbox styles (avoids Tailwind/oklch)
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.left = "-9999px";
  iframe.style.top = "0";
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) return;

  // Clean HTML with no Tailwind
  doc.open();
  doc.write(`
    <html>
      <head>
        <style>
          body {
            background-color: #ffffff;
            color: #000000;
            font-family: Arial, sans-serif;
            padding: 20mm;
            width: 210mm;
          }
          h1 {
            color: #1a365d;
            font-size: 24pt;
            font-weight: bold;
            margin-bottom: 20px;
          }
          .content {
            font-size: 12pt;
            line-height: 1.6;
            color: #000000;
            white-space: pre-wrap;
          }
        </style>
      </head>
      <body>
        <h1>AI Generated Worksheet</h1>
        <div class="content">${worksheet.replace(/\n/g, "<br>")}</div>
      </body>
    </html>
  `);
  doc.close();

  // Wait for iframe to render
  setTimeout(async () => {
    try {
      const canvas = await html2canvas(iframe.contentDocument!.body, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("worksheet.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      document.body.removeChild(iframe);
    }
  }, 300); // slight delay to allow render
};



  return (
    <section className="mt-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 p-3 rounded-xl mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-blue-700">
          AI Generated Worksheet
        </h2>
      </div>
      
      <div
      ref={worksheetRef}
      className="max-w-full overflow-hidden break-words text-[14px] leading-7 text-black"
    >
      {formatWorksheetContent(worksheet)}
    </div>

      
      <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end space-x-3">
        <button 
          onClick={copyToClipboard}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors shadow-sm flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          {copySuccess ? 'Copied!' : 'Copy Content'}
        </button>
        
        <button 
          onClick={downloadAsPDF}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download as PDF
        </button>
      </div>
    </section>
  );
};

export default WorkSheetComponent;