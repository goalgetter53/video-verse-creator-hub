
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Video, Play, Wand2, ChevronRight, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateVideo = () => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("professional-woman");
  const [selectedBackground, setSelectedBackground] = useState("office");
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState("");
  const { toast } = useToast();

  const handleGenerateVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast({
        title: "Input required",
        description: "Please enter a script for your video.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Simulate API call to video generation service
    try {
      // For demo purposes we'll simulate a delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // This would be where we'd call an actual API
      // Example:
      // const response = await fetch('/api/generate-video', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ prompt, avatar: selectedAvatar, background: selectedBackground }),
      // });
      
      // In a real app, we'd get the video URL from the response
      setGeneratedVideoUrl("/placeholder.svg"); // Placeholder for now
      
      toast({
        title: "Video generated successfully",
        description: "Your video is now ready to customize and share.",
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "There was an error generating your video. Please try again.",
        variant: "destructive",
      });
      console.error("Error generating video:", error);
    } finally {
      setLoading(false);
    }
  };

  const avatarOptions = [
    { value: "professional-woman", label: "Professional Woman" },
    { value: "professional-man", label: "Professional Man" },
    { value: "casual-woman", label: "Casual Woman" },
    { value: "casual-man", label: "Casual Man" },
  ];

  const backgroundOptions = [
    { value: "office", label: "Office" },
    { value: "abstract", label: "Abstract" },
    { value: "nature", label: "Nature" },
    { value: "studio", label: "Studio" },
  ];

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Video</h1>
          <p className="text-muted-foreground mt-1">Generate a professional AI video from text</p>
        </div>

        <Tabs defaultValue="text-to-video" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="text-to-video">Text to Video</TabsTrigger>
            <TabsTrigger value="upload-video">Upload Video</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="text-to-video" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Create from Text</CardTitle>
                  <CardDescription>Enter your script and customize your video</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleGenerateVideo} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Video Title</Label>
                      <Input 
                        id="title"
                        placeholder="Enter video title"
                        value={videoTitle}
                        onChange={e => setVideoTitle(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="prompt">Script / Prompt</Label>
                      <Textarea 
                        id="prompt"
                        placeholder="Enter your script or prompt for the AI to generate a video..."
                        rows={5}
                        value={prompt}
                        onChange={e => setPrompt(e.target.value)}
                        className="resize-none"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="avatar">Select Avatar</Label>
                        <Select value={selectedAvatar} onValueChange={setSelectedAvatar}>
                          <SelectTrigger id="avatar">
                            <SelectValue placeholder="Choose an avatar" />
                          </SelectTrigger>
                          <SelectContent>
                            {avatarOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="background">Select Background</Label>
                        <Select value={selectedBackground} onValueChange={setSelectedBackground}>
                          <SelectTrigger id="background">
                            <SelectValue placeholder="Choose a background" />
                          </SelectTrigger>
                          <SelectContent>
                            {backgroundOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating Video...
                        </>
                      ) : (
                        <>
                          <Wand2 className="mr-2 h-4 w-4" />
                          Generate Video
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>
                    {generatedVideoUrl ? "Your generated video" : "Video will appear here"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="video-container rounded-md overflow-hidden border bg-black/5 flex items-center justify-center">
                    {generatedVideoUrl ? (
                      <div className="relative w-full h-full">
                        <img 
                          src={generatedVideoUrl} 
                          alt="Video preview" 
                          className="w-full h-full object-cover"
                        />
                        <Button 
                          size="icon" 
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full"
                          variant="ghost"
                        >
                          <Play className="h-8 w-8 text-white" />
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center p-12">
                        <Video className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                        <p className="text-muted-foreground">Enter your script and generate a video to see the preview</p>
                      </div>
                    )}
                  </div>
                </CardContent>
                {generatedVideoUrl && (
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="/captions">
                        Proceed to Captions
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="upload-video" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Upload Your Own Video</CardTitle>
                <CardDescription>Upload an existing video to enhance with AI captions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="video-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        MP4, MOV, or WebM (MAX. 500MB)
                      </p>
                    </div>
                    <input id="video-upload" type="file" className="hidden" accept="video/*" />
                  </label>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" disabled>
                  Upload and Continue
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Video Templates</CardTitle>
                <CardDescription>Choose from professionally designed templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="rounded-lg overflow-hidden border bg-muted/20 hover:bg-muted/30 cursor-pointer transition-colors">
                      <div className="aspect-video bg-muted flex items-center justify-center">
                        <Video className="h-8 w-8 text-muted-foreground/50" />
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-sm">Template {i}</h3>
                        <p className="text-xs text-muted-foreground">Professional {i % 2 === 0 ? "Promo" : "Tutorial"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default CreateVideo;
