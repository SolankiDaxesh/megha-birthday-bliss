
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { QrCode, Share2, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const QRShare = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentUrl = window.location.href;

  const generateQRCode = (text: string, size: number = 200) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast({
        title: "Copied!",
        description: "Birthday card URL copied to clipboard! 🎉",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy the URL manually",
        variant: "destructive",
      });
    }
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Birthday Card',
          text: 'Check out this amazing birthday card! 🎂🎉',
          url: currentUrl,
        });
      } catch (err) {
        console.log('Sharing cancelled');
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="fixed top-4 left-4 z-50 bg-white/80 backdrop-blur-sm hover:bg-white/90"
        >
          <Share2 className="h-4 w-4" />
          <span className="ml-2 text-xs">Share</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Share This Birthday Card 🎂</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 p-4">
          <div className="text-center">
            <div className="bg-white p-4 rounded-lg shadow-sm inline-block">
              <img 
                src={generateQRCode(currentUrl)} 
                alt="QR Code for birthday card"
                className="w-48 h-48 mx-auto"
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Scan with phone camera to open
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={shareNative}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Birthday Card
            </Button>

            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="w-full"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </Button>
          </div>

          <div className="text-center text-xs text-gray-500">
            <p>Share the joy and let others celebrate too! 🎉</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRShare;
