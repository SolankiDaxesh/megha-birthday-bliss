
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
            <title>Happy Birthday Megha - Complete Birthday Card</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600;700&display=swap');
              body { 
                margin: 0; 
                padding: 20px; 
                font-family: 'Dancing Script', cursive; 
                background: linear-gradient(135deg, #e0e7ff, #fce7f3);
                color: #374151;
              }
              .page { 
                max-width: 800px; 
                margin: 0 auto 40px auto; 
                background: white;
                border-radius: 20px;
                padding: 40px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                page-break-after: always;
              }
              .page:last-child { page-break-after: avoid; }
              h1 { 
                color: #7c3aed; 
                text-align: center; 
                font-size: 3em;
                margin-bottom: 30px;
                text-shadow: 2px 2px 4px rgba(124, 58, 237, 0.3);
              }
              h2 { 
                color: #7c3aed; 
                text-align: center; 
                font-size: 2.5em;
                margin-bottom: 25px;
              }
              h3 { 
                color: #ec4899; 
                font-size: 1.8em;
                margin-bottom: 15px;
              }
              .greeting-section {
                text-align: center;
                background: linear-gradient(135deg, #fce7f3, #ddd6fe);
                padding: 40px;
                border-radius: 20px;
                margin: 30px 0;
              }
              .message-section { 
                padding: 30px; 
                background: linear-gradient(135deg, #fce7f3, #ddd6fe); 
                border-radius: 15px; 
                margin: 20px 0;
                border-left: 6px solid #7c3aed;
              }
              .wishes-grid { 
                display: grid; 
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
                gap: 20px; 
                margin: 25px 0;
              }
              .wish-card { 
                padding: 20px; 
                background: linear-gradient(135deg, #f3e8ff, #fdf2f8); 
                border-radius: 15px; 
                border-left: 4px solid #7c3aed;
                box-shadow: 0 4px 12px rgba(124, 58, 237, 0.15);
              }
              .dubai-memories {
                background: linear-gradient(135deg, #fef3c7, #fce7f3);
                padding: 30px;
                border-radius: 15px;
                margin: 20px 0;
              }
              .memories-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin: 20px 0;
              }
              .memory-item {
                background: white;
                padding: 15px;
                border-radius: 10px;
                text-align: center;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
              }
              .interactive-section {
                background: linear-gradient(135deg, #e0f2fe, #f3e8ff);
                padding: 30px;
                border-radius: 15px;
                margin: 20px 0;
              }
              .games-section {
                background: linear-gradient(135deg, #f0fdf4, #fef3c7);
                padding: 30px;
                border-radius: 15px;
                margin: 20px 0;
              }
              .facts-section {
                background: linear-gradient(135deg, #fef7cd, #fed7d7);
                padding: 30px;
                border-radius: 15px;
                margin: 20px 0;
              }
              .guest-book {
                background: linear-gradient(135deg, #f0f9ff, #fce7f3);
                padding: 30px;
                border-radius: 15px;
                margin: 20px 0;
              }
              .guest-message {
                background: white;
                padding: 20px;
                border-radius: 10px;
                margin: 15px 0;
                border-left: 4px solid #ec4899;
                box-shadow: 0 2px 8px rgba(0,0,0,0.05);
              }
              .footer { 
                text-align: center; 
                margin-top: 40px; 
                color: #6b7280;
                font-size: 1.2em;
              }
              .emoji { font-size: 1.5em; }
              p { line-height: 1.6; font-size: 1.1em; }
              .center { text-align: center; }
              .highlight {
                background: linear-gradient(120deg, #fbbf24 0%, #f59e0b 100%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                font-weight: bold;
              }
            </style>
          </head>
          <body>
            <!-- Greeting Page -->
            <div class="page">
              <div class="greeting-section">
                <h1>🎉 Happy Birthday Megha! 🎂</h1>
                <div class="center">
                  <p class="emoji">🌟✨🎈🎊🌈💖🎁🎵</p>
                  <h3 class="highlight">Today is YOUR special day!</h3>
                  <p style="font-size: 1.3em; margin: 20px 0;">
                    Welcome to your magical birthday celebration! This interactive card is filled with love, memories, and special surprises just for you.
                  </p>
                  <p class="emoji">🎂🕯️🎉🎈🌸💝🎊✨</p>
                </div>
              </div>
            </div>

            <!-- Dubai Memories Page -->
            <div class="page">
              <h2>🏙️ Dubai Memories 🌟</h2>
              <div class="dubai-memories">
                <p class="center" style="font-size: 1.3em; margin-bottom: 25px;">
                  <strong>Remembering our beautiful time in Dubai together! 🇦🇪✨</strong>
                </p>
                <div class="memories-grid">
                  <div class="memory-item">
                    <h3>🏗️ Burj Khalifa</h3>
                    <p>Amazing views from the top! The city looked so beautiful from up there.</p>
                  </div>
                  <div class="memory-item">
                    <h3>🛍️ Dubai Mall</h3>
                    <p>Shopping, aquarium visits, and so much fun exploring together!</p>
                  </div>
                  <div class="memory-item">
                    <h3>🏖️ Beach Days</h3>
                    <p>Relaxing by the beautiful beaches and enjoying the sunset.</p>
                  </div>
                  <div class="memory-item">
                    <h3>🍽️ Amazing Food</h3>
                    <p>Trying delicious cuisines and creating foodie memories!</p>
                  </div>
                  <div class="memory-item">
                    <h3>🎢 Theme Parks</h3>
                    <p>Thrilling rides and adventures that made us laugh so much!</p>
                  </div>
                  <div class="memory-item">
                    <h3>📸 Photo Sessions</h3>
                    <p>Capturing beautiful moments against Dubai's stunning backdrop.</p>
                  </div>
                </div>
                <p class="center" style="margin-top: 25px; font-style: italic;">
                  "Every moment in Dubai with you was special and unforgettable! 💕"
                </p>
              </div>
            </div>

            <!-- Birthday Message Page -->
            <div class="page">
              <h2>💖 Special Birthday Message 💖</h2>
              <div class="message-section">
                <h3>Dear Amazing Megha,</h3>
                <p>On your birthday, I want to celebrate the incredible sister you are. Your kindness, intelligence, and wonderful spirit brighten the lives of everyone around you.</p>
                <p>You have this amazing ability to make people smile, to see the good in every situation, and to bring joy wherever you go. Your strength and determination inspire me every day.</p>
                <p>As you step into this new year of your life, I want you to know how proud I am of all that you've accomplished and how excited I am for all the amazing things that await you.</p>
                <p>May this year bring you:</p>
                <ul style="font-size: 1.1em; margin: 20px 0;">
                  <li>🌟 All the happiness your heart can hold</li>
                  <li>✨ Success in everything you pursue</li>
                  <li>💝 Beautiful experiences and adventures</li>
                  <li>🌈 Dreams that come true</li>
                  <li>💖 Love and laughter every single day</li>
                </ul>
                <p><strong>Thank you for being the incredible sister that you are. You mean the world to me!</strong></p>
                <p class="center" style="margin-top: 30px; font-size: 1.3em;">
                  <strong>With all my love and best wishes! 💕🎂</strong>
                </p>
              </div>
            </div>

            <!-- Birthday Wishes Page -->
            <div class="page">
              <h2>🌟 Birthday Wishes 🌟</h2>
              <div class="wishes-grid">
                <div class="wish-card">
                  <h3>🎊 Joy & Laughter</h3>
                  <p>May your day be filled with endless joy, laughter, and beautiful memories that will last a lifetime!</p>
                </div>
                <div class="wish-card">
                  <h3>✨ Dreams Come True</h3>
                  <p>May all your dreams and wishes come true this year, and may new opportunities open doors to happiness!</p>
                </div>
                <div class="wish-card">
                  <h3>🌈 Bright Future</h3>
                  <p>Wishing you a future filled with success, adventure, and all the wonderful things life has to offer!</p>
                </div>
                <div class="wish-card">
                  <h3>💖 Love & Peace</h3>
                  <p>May your heart be filled with love, your mind with peace, and your life with countless blessings!</p>
                </div>
                <div class="wish-card">
                  <h3>🎁 Amazing Surprises</h3>
                  <p>May this year surprise you with wonderful gifts, unexpected joys, and beautiful moments!</p>
                </div>
                <div class="wish-card">
                  <h3>🌸 Health & Happiness</h3>
                  <p>Wishing you good health, boundless energy, and happiness that grows stronger each day!</p>
                </div>
              </div>
            </div>

            <!-- Interactive & Games Page -->
            <div class="page">
              <h2>🎮 Interactive Fun & Games 🎲</h2>
              <div class="interactive-section">
                <h3>🕯️ Birthday Candles Experience</h3>
                <p>In the web version, you can blow out virtual candles and make wishes! Each candle represents a year of your amazing life.</p>
              </div>
              <div class="games-section">
                <h3>🎵 Birthday Music</h3>
                <p>The interactive card plays your special birthday song to make the celebration even more magical!</p>
                
                <h3>🎯 Birthday Mini Games</h3>
                <p>Fun games to play including balloon popping, cake decorating, and memory games - all designed to make your day extra special!</p>
                
                <h3>🎂 Virtual Cake Cutting</h3>
                <p>A beautiful virtual cake that you can "cut" with interactive animations and celebratory effects!</p>
              </div>
            </div>

            <!-- Fun Facts Page -->
            <div class="page">
              <h2>🎯 Fun Birthday Facts 📚</h2>
              <div class="facts-section">
                <div class="wish-card">
                  <h3>🌟 Your Special Day</h3>
                  <p>Did you know that birthdays are the most celebrated occasions worldwide? Today, millions of people around the world are celebrating their birthdays too!</p>
                </div>
                <div class="wish-card">
                  <h3>🎂 Birthday Cake Tradition</h3>
                  <p>The tradition of birthday cakes dates back to ancient Greece, where people offered round cakes to Artemis as a tribute!</p>
                </div>
                <div class="wish-card">
                  <h3>🕯️ Candle Wishes</h3>
                  <p>Making wishes while blowing out candles is believed to carry your wishes up to the heavens with the smoke!</p>
                </div>
                <div class="wish-card">
                  <h3>🎵 Happy Birthday Song</h3>
                  <p>The "Happy Birthday" song is one of the most recognized songs in the world, sung in virtually every language!</p>
                </div>
              </div>
            </div>

            <!-- Guest Book Page -->
            <div class="page">
              <h2>📝 Birthday Guest Book 💕</h2>
              <div class="guest-book">
                <p class="center" style="font-size: 1.3em; margin-bottom: 30px;">
                  <strong>Beautiful messages from your loved ones</strong>
                </p>
                <div class="guest-message">
                  <h3>🎂 From Your Brother</h3>
                  <p>"Happy Birthday Megha! 🎉 Hope your day is as wonderful as you are! May this year bring you endless joy and beautiful memories! 🌟✨"</p>
                  <p style="color: #6b7280; font-size: 0.9em;">Sent with love</p>
                </div>
                <div class="guest-message">
                  <h3>💝 From Mom & Dad</h3>
                  <p>"Our dearest Megha, watching you grow has been our greatest joy! 💖 Have the most amazing birthday celebration! 🎈🎊"</p>
                  <p style="color: #6b7280; font-size: 0.9em;">With all our love</p>
                </div>
                <div class="guest-message">
                  <h3>✨ Interactive Web Version</h3>
                  <p>The online version allows friends and family to leave their own personal messages in real-time, creating a growing collection of birthday wishes!</p>
                </div>
              </div>
            </div>

            <!-- Final Page -->
            <div class="page">
              <div class="greeting-section">
                <h2>🎉 Happy Birthday Once Again! 🎂</h2>
                <p class="center" style="font-size: 1.4em; margin: 30px 0;">
                  This special birthday card was created with love, filled with memories, wishes, and all the joy your heart can hold.
                </p>
                <p class="center emoji" style="font-size: 2em;">
                  🎈🎊🌟💖✨🎁🎵🎂
                </p>
                <div class="footer">
                  <p>💕 Created with love for Megha's special day 💕</p>
                  <p>🎈 A complete interactive birthday experience 🎈</p>
                  <p>Generated on: ${new Date().toLocaleDateString()}</p>
                  <p style="margin-top: 20px; font-style: italic;">
                    "May this birthday mark the beginning of your most amazing year yet!"
                  </p>
                </div>
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
      // Create a comprehensive image by capturing the main content
      const element = document.querySelector('.min-h-screen') as HTMLElement;
      if (!element) throw new Error('Content not found');
      
      const canvas = await html2canvas(element, {
        backgroundColor: '#f8fafc',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        height: window.innerHeight * 2, // Capture more content
        width: window.innerWidth
      });
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `megha-complete-birthday-card-${new Date().toISOString().split('T')[0]}.png`;
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
            className="mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border min-w-[280px]"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Complete Birthday Card</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
              Download the entire birthday experience with all sections included!
            </p>
            <div className="flex gap-2">
              <Button
                onClick={downloadAsPDF}
                disabled={isDownloading}
                size="sm"
                className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white flex-1"
              >
                <FileText className="h-4 w-4" />
                Complete PDF
              </Button>
              <Button
                onClick={downloadAsImage}
                disabled={isDownloading}
                size="sm"
                className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white flex-1"
              >
                <FileImage className="h-4 w-4" />
                Full Image
              </Button>
            </div>
            {isDownloading && (
              <p className="text-xs text-center text-gray-500 mt-2">
                Creating your complete birthday card...
              </p>
            )}
          </div>
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
