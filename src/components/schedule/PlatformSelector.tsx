
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PlatformSelectorProps {
  selectedPlatform: string;
  setSelectedPlatform: (platform: string) => void;
}

const PlatformSelector = ({ selectedPlatform, setSelectedPlatform }: PlatformSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label>Platform</Label>
      <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
        <SelectTrigger>
          <SelectValue placeholder="Select platform" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="instagram">Instagram</SelectItem>
          <SelectItem value="facebook">Facebook</SelectItem>
          <SelectItem value="twitter">Twitter</SelectItem>
          <SelectItem value="linkedin">LinkedIn</SelectItem>
          <SelectItem value="youtube">YouTube</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PlatformSelector;
