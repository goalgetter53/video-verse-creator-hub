
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ContentInputProps {
  content: string;
  setContent: (content: string) => void;
}

const ContentInput = ({ content, setContent }: ContentInputProps) => {
  return (
    <div className="space-y-2">
      <Label>Post Content</Label>
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter post content"
      />
    </div>
  );
};

export default ContentInput;
