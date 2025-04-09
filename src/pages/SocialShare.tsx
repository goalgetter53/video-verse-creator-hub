
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, Clock, Plus, Upload, Loader2, Facebook, Instagram, Twitter, Linkedin, Youtube, Globe, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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

  const platformIcons = {
    instagram: <Instagram className="h-5 w-5" />,
    facebook: <Facebook className="h-5 w-5" />,
    twitter: <Twitter className="h-5 w-5" />,
    linkedin: <Linkedin className="h-5 w-5" />,
    youtube: <Youtube className="h-5 w-5" />,
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Share & Schedule</h1>
          <p className="text-muted-foreground mt-1">Share your video to social media or schedule for later</p>
        </div>

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
                
                <TabsContent value="schedule" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Schedule Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Select a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time">Schedule Time</Label>
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <Clock className="mr-2 h-4 w-4" />
                          <Input
                            id="time"
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="border-0 p-0 focus-visible:ring-0"
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Social Platforms</CardTitle>
                <CardDescription>Select where to share your video</CardDescription>
              </CardHeader>
              <CardContent>
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
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={handleShare}
                  disabled={loading || !Object.values(selectedPlatforms).some(v => v)}
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
              </CardFooter>
            </Card>
          </div>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default SocialShare;
