
import React from "react";
import { Share2 } from "lucide-react";

const PostPreview = () => {
  return (
    <div className="space-y-6">
      <div className="video-container rounded-md overflow-hidden border bg-black/5 flex items-center justify-center">
        <div className="text-center p-12">
          <Share2 className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">Your video is ready to share</p>
        </div>
      </div>
      
      <div className="p-4 border rounded-lg">
        <p className="text-sm">
          🎬 Introducing our new product line! We've designed these with you in mind, focusing on quality and sustainability. Check out the link in bio to learn more about our eco-friendly initiatives. #NewProduct #Sustainability #Innovation
        </p>
      </div>
    </div>
  );
};

export default PostPreview;
