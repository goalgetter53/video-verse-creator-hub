
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PlatformSelector from "./PlatformSelector";
import ContentInput from "./ContentInput";
import DateSelector from "./DateSelector";
import TimeSelector from "./TimeSelector";
import { useScheduledPosts } from "@/utils/scheduledPosts";

const ScheduleForm = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("12:00");
  const [content, setContent] = useState<string>("New Video Post");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("instagram");
  const [isScheduling, setIsScheduling] = useState(false);
  
  const { toast } = useToast();
  const { schedulePost } = useScheduledPosts();

  const handleSchedulePost = async () => {
    if (!date) {
      toast({
        title: "Date required",
        description: "Please select a date for scheduling.",
        variant: "destructive",
      });
      return;
    }

    setIsScheduling(true);
    
    // Create a Date object with the selected date and time
    const scheduledDateTime = new Date(date);
    const [hours, minutes] = time.split(':').map(Number);
    scheduledDateTime.setHours(hours, minutes);

    // Create platforms object
    const platforms = {
      [selectedPlatform]: true
    };

    await schedulePost(content, scheduledDateTime, platforms);
    
    // Reset form
    setDate(undefined);
    setTime("12:00");
    setContent("New Video Post");
    setIsScheduling(false);
  };

  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle>Schedule a Post</CardTitle>
        <CardDescription>Select a date and time to schedule your video</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <PlatformSelector 
          selectedPlatform={selectedPlatform} 
          setSelectedPlatform={setSelectedPlatform} 
        />
        
        <ContentInput 
          content={content} 
          setContent={setContent} 
        />
        
        <DateSelector 
          date={date} 
          setDate={setDate} 
        />
        
        <TimeSelector 
          time={time} 
          setTime={setTime} 
        />
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleSchedulePost}
          disabled={isScheduling}
        >
          {isScheduling ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Scheduling...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Schedule Post
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ScheduleForm;
