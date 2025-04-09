
import React from "react";

interface SharePageHeaderProps {
  isScheduled: boolean;
}

const SharePageHeader = ({ isScheduled }: SharePageHeaderProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Share & Schedule</h1>
      <p className="text-muted-foreground mt-1">Share your video to social media or schedule for later</p>
    </div>
  );
};

export default SharePageHeader;
