
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileImage, FileText, Package, Database } from "lucide-react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const DownloadCard = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadType, setDownloadType] = useState("");

  const downloadAsPDF = async () => {
    setIsDownloading(true);
    setDownloadType("PDF");
    
    try {
      // Create a new window with the card content
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
              .page-break { page-break-before: always; }
              h1, h2 { color: #7c3aed; text-align: center; }
              .message { padding: 20px; background: linear-gradient(135deg, #fce7f3, #ddd6fe); border-radius: 15px; margin: 20px 0; }
              .wishes { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; }
              .wish-card { padding: 15px; background: #f3e8ff; border-radius: 10px; border-left: 4px solid #7c3aed; }
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

              <div class="page-break"></div>

              <h2>🌟 Birthday Wishes</h2>
              <div class="wishes">
                <div class="wish-card">
                  <h3>🎊 Joy & Laughter</h3>
                  <p>May your day be filled with endless joy, laughter, and beautiful memories!</p>
                </div>
                <div class="wish-card">
                  <h3>✨ Dreams Come True</h3>
                  <p>May all your dreams and wishes come true this year!</p>
                </div>
                <div class="wish-card">
                  <h3>🌈 Bright Future</h3>
                  <p>Wishing you a future filled with success and happiness!</p>
                </div>
                <div class="wish-card">
                  <h3>💖 Love & Peace</h3>
                  <p>May your heart be filled with love and your mind with peace!</p>
                </div>
              </div>

              <div class="footer">
                <p>🎈 Created with love for Megha's special day 🎈</p>
                <p>Generated from: ${window.location.href}</p>
              </div>
            </div>
          </body>
        </html>
      `);
      
      printWindow.document.close();
      
      // Wait for content to load then trigger print
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 1000);
      
    } catch (error) {
      console.error('PDF download failed:', error);
      alert('PDF download failed. Please try again.');
    }
    
    setIsDownloading(false);
    setDownloadType("");
  };

  const downloadAsImage = async () => {
    setIsDownloading(true);
    setDownloadType("Image");
    
    try {
      // Capture the main content area
      const element = document.querySelector('.min-h-screen') as HTMLElement;
      if (!element) throw new Error('Content not found');
      
      const canvas = await html2canvas(element, {
        backgroundColor: '#f8fafc',
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      // Convert to blob and download
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
    setDownloadType("");
  };

  const downloadGuestBookData = () => {
    setIsDownloading(true);
    setDownloadType("Data");
    
    try {
      // Get guest book data from localStorage
      const guestBookData = localStorage.getItem('birthday-guest-book') || '[]';
      const achievements = localStorage.getItem('birthday-achievements') || '{}';
      
      const exportData = {
        guestBook: JSON.parse(guestBookData),
        achievements: JSON.parse(achievements),
        exportDate: new Date().toISOString(),
        cardUrl: window.location.href
      };
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `megha-birthday-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Data download failed:', error);
      alert('Data download failed. Please try again.');
    }
    
    setIsDownloading(false);
    setDownloadType("");
  };

  const downloadWebPackage = () => {
    setIsDownloading(true);
    setDownloadType("Package");
    
    try {
      // Create a simple HTML file with the card URL
      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Megha's Birthday Card</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: 'Dancing Script', cursive;
            background: linear-gradient(135deg, #e0e7ff, #fce7f3);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 600px;
        }
        h1 { color: #7c3aed; margin-bottom: 20px; }
        .link { 
            background: linear-gradient(135deg, #7c3aed, #ec4899);
            color: white;
            padding: 15px 30px;
            border-radius: 50px;
            text-decoration: none;
            display: inline-block;
            margin: 20px 0;
            font-weight: bold;
        }
        .link:hover { transform: translateY(-2px); transition: transform 0.3s; }
        .note { color: #6b7280; margin-top: 20px; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎉 Megha's Interactive Birthday Card 🎂</h1>
        <p>Click the link below to view the full interactive birthday experience!</p>
        <a href="${window.location.href}" class="link" target="_blank">
            🎈 Open Birthday Card 🎈
        </a>
        <div class="note">
            <p>This card includes interactive games, music, and personalized messages!</p>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
        </div>
    </div>
</body>
</html>`;

      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `megha-birthday-card-${new Date().toISOString().split('T')[0]}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Package download failed:', error);
      alert('Package download failed. Please try again.');
    }
    
    setIsDownloading(false);
    setDownloadType("");
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 shadow-lg">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Download className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <h3 className="text-2xl font-script font-bold text-purple-700 dark:text-purple-300">
              📥 Download Birthday Card 📥
            </h3>
          </div>
          <p className="text-purple-600 dark:text-purple-400 text-sm">
            Save this special birthday card in your preferred format!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={downloadAsPDF}
              disabled={isDownloading}
              className="w-full h-20 bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 flex flex-col items-center justify-center gap-2"
            >
              <FileText className="h-6 w-6" />
              <span className="text-sm font-medium">
                {isDownloading && downloadType === "PDF" ? "Generating..." : "PDF Document"}
              </span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={downloadAsImage}
              disabled={isDownloading}
              className="w-full h-20 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 flex flex-col items-center justify-center gap-2"
            >
              <FileImage className="h-6 w-6" />
              <span className="text-sm font-medium">
                {isDownloading && downloadType === "Image" ? "Capturing..." : "PNG Image"}
              </span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={downloadWebPackage}
              disabled={isDownloading}
              className="w-full h-20 bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600 flex flex-col items-center justify-center gap-2"
            >
              <Package className="h-6 w-6" />
              <span className="text-sm font-medium">
                {isDownloading && downloadType === "Package" ? "Packaging..." : "Web Package"}
              </span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={downloadGuestBookData}
              disabled={isDownloading}
              className="w-full h-20 bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600 flex flex-col items-center justify-center gap-2"
            >
              <Database className="h-6 w-6" />
              <span className="text-sm font-medium">
                {isDownloading && downloadType === "Data" ? "Exporting..." : "Guest Book Data"}
              </span>
            </Button>
          </motion.div>
        </div>

        <div className="mt-6 text-center">
          <div className="text-xs text-purple-600 dark:text-purple-400 space-y-1">
            <p>📄 <strong>PDF:</strong> Printable version of the birthday card</p>
            <p>🖼️ <strong>PNG:</strong> High-quality image of the current view</p>
            <p>📦 <strong>Web Package:</strong> HTML file with link to interactive card</p>
            <p>💾 <strong>Guest Book Data:</strong> JSON export of messages and achievements</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadCard;
