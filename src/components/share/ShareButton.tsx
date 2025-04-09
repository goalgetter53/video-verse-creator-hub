
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, Clock } from "lucide-react";

interface ShareButtonProps {
  loading: boolean;
  isScheduled: boolean;
  handleShare: () => void;
  disabled: boolean;
}

const ShareButton = ({ loading, isScheduled, handleShare, disabled }: ShareButtonProps) => {
  return (
    <Button
      className="w-full"
      onClick={handleShare}
      disabled={loading || disabled}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {isScheduled ? "Scheduling..." : "Sharing..."}
        </>
      ) : (
        <>
          {isScheduled ? (
            <>
              <Clock className="mr-2 h-4 w-4" />
              Schedule Post
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Share Now
            </>
          )}
        </>
      )}
    </Button>
  );
};

export default ShareButton;
