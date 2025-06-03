
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileImage, FileText, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";

const QuickDownload = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadAsPDF = async () => {
    setIsDownloading(true);
    
    try {
      const printWindow = window.open('', '_blank');
      if (!printWindow) throw new Error('Popup blocked');
      
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Happy Birthday Megha - Birthday Card</title>
            <style>
              body { margin: 0; padding: 20px; font-family: 'Dancing Script', cursive; }
              .card-content { max-width: 800px; margin: 0 auto; }
              h1, h2 { color: #7c3aed; text-align: center; }
              .message { padding: 20px; background: linear-gradient(135deg, #fce7f3, #ddd6fe); border-radius: 15px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 40px; color: #6b7280; }
            </style>
          </head>
          <body>
            <div class="card-content">
              <h1>🎉 Happy Birthday Megha! 🎂</h1>
              <div class="message">
                <h2>Your Special Day</h2>
                <p>Dear Megha, on your birthday, I want to celebrate the amazing sister you are. Your kindness, intelligence, and wonderful spirit brighten the lives of everyone around you.</p>
                <p>May this year bring you all the happiness, success, and beautiful experiences you deserve. Thank you for being the incredible sister that you are!</p>
                <p><strong>With love and best wishes!</strong></p>
              </div>
              <div style="text-align: center; margin-top: 40px; color: #6b7280;">
                <p>🎈 Created with love for Megha's special day 🎈</p>
              </div>
            </div>
          </body>
        </html>
      `);
      
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 1000);
      
    } catch (error) {
      console.error('PDF download failed:', error);
      alert('PDF download failed. Please try again.');
    }
    
    setIsDownloading(false);
    setIsOpen(false);
  };

  const downloadAsImage = async () => {
    setIsDownloading(true);
    
    try {
      const element = document.querySelector('.min-h-screen') as HTMLElement;
      if (!element) throw new Error('Content not found');
      
      const canvas = await html2canvas(element, {
        backgroundColor: '#f8fafc',
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `megha-birthday-card-${new Date().toISOString().split('T')[0]}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }, 'image/png');
      
    } catch (error) {
      console.error('Image download failed:', error);
      alert('Image download failed. Please try again.');
    }
    
    setIsDownloading(false);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 border"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quick Download</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={downloadAsPDF}
                disabled={isDownloading}
                size="sm"
                className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white"
              >
                <FileText className="h-4 w-4" />
                PDF
              </Button>
              <Button
                onClick={downloadAsImage}
                disabled={isDownloading}
                size="sm"
                className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white"
              >
                <FileImage className="h-4 w-4" />
                PNG
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full h-12 w-12 shadow-lg"
        disabled={isDownloading}
      >
        <Download className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default QuickDownload;
