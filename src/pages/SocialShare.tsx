
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import PlatformSelector from "@/components/share/PlatformSelector";
import PostPreview from "@/components/share/PostPreview";
import ScheduleOptions from "@/components/share/ScheduleOptions";
import ShareButton from "@/components/share/ShareButton";
import SharePageHeader from "@/components/share/SharePageHeader";

const SocialShare = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("12:00");
  const [isScheduled, setIsScheduled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState({
    instagram: true,
    facebook: false,
    twitter: false,
    linkedin: false,
    youtube: false,
  });
  const { toast } = useToast();

  const togglePlatform = (platform: keyof typeof selectedPlatforms) => {
    setSelectedPlatforms(prev => ({
      ...prev,
      [platform]: !prev[platform]
    }));
  };

  const handleShare = async () => {
    if (!Object.values(selectedPlatforms).some(v => v)) {
      toast({
        title: "Platform required",
        description: "Please select at least one platform to share to.",
        variant: "destructive",
      });
      return;
    }

    if (isScheduled && !date) {
      toast({
        title: "Date required",
        description: "Please select a date for scheduling.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const action = isScheduled ? "scheduled" : "shared";
      const platforms = Object.entries(selectedPlatforms)
        .filter(([_, selected]) => selected)
        .map(([platform]) => platform);

      const message = isScheduled
        ? `Your post has been scheduled for ${format(date!, "PPP")} at ${time}`
        : `Your post has been shared to ${platforms.join(", ")}`;

      toast({
        title: `Successfully ${action}!`,
        description: message,
      });
    } catch (error) {
      toast({
        title: "Operation failed",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      });
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <SharePageHeader isScheduled={isScheduled} />

        <Tabs defaultValue="share" onValueChange={(value) => setIsScheduled(value === "schedule")}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="share">Share Now</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Post Preview</CardTitle>
                <CardDescription>
                  {isScheduled 
                    ? "Schedule your post for a specific date and time" 
                    : "Review your content before sharing"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <PostPreview />
                
                <TabsContent value="schedule" className="space-y-4 mt-4">
                  <ScheduleOptions
                    date={date}
                    setDate={setDate}
                    time={time}
                    setTime={setTime}
                  />
                </TabsContent>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Social Platforms</CardTitle>
                <CardDescription>Select where to share your video</CardDescription>
              </CardHeader>
              <CardContent>
                <PlatformSelector 
                  selectedPlatforms={selectedPlatforms}
                  togglePlatform={togglePlatform}
                />
              </CardContent>
              <CardFooter>
                <ShareButton
                  loading={loading}
                  isScheduled={isScheduled}
                  handleShare={handleShare}
                  disabled={!Object.values(selectedPlatforms).some(v => v)}
                />
              </CardFooter>
            </Card>
          </div>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default SocialShare;
