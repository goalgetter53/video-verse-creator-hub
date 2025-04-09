
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Plus } from "lucide-react";

interface PlatformSelectorProps {
  selectedPlatforms: {
    instagram: boolean;
    facebook: boolean;
    twitter: boolean;
    linkedin: boolean;
    youtube: boolean;
  };
  togglePlatform: (platform: keyof typeof selectedPlatforms) => void;
}

const PlatformSelector = ({ selectedPlatforms, togglePlatform }: PlatformSelectorProps) => {
  const platformIcons = {
    instagram: <Instagram className="h-5 w-5" />,
    facebook: <Facebook className="h-5 w-5" />,
    twitter: <Twitter className="h-5 w-5" />,
    linkedin: <Linkedin className="h-5 w-5" />,
    youtube: <Youtube className="h-5 w-5" />,
  };

  return (
    <div className="space-y-4">
      {Object.entries(selectedPlatforms).map(([platform, checked]) => (
        <div key={platform} className="flex items-center space-x-2">
          <Checkbox 
            id={platform} 
            checked={checked} 
            onCheckedChange={() => togglePlatform(platform as keyof typeof selectedPlatforms)} 
          />
          <Label htmlFor={platform} className="flex items-center cursor-pointer">
            <div className="mr-2">
              {platformIcons[platform as keyof typeof platformIcons]}
            </div>
            <span className="capitalize">{platform}</span>
          </Label>
        </div>
      ))}
      
      <Button variant="outline" className="w-full mt-2">
        <Plus className="mr-2 h-4 w-4" />
        Connect More Accounts
      </Button>
    </div>
  );
};

export default PlatformSelector;
