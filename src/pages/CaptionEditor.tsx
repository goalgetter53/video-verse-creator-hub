
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand2, ChevronRight, Play, Loader2, MessageSquare, Languages } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CaptionEditor = () => {
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("en");
  const [style, setStyle] = useState("informative");
  const [length, setLength] = useState("medium");
  const [platform, setPlatform] = useState("instagram");
  const { toast } = useToast();

  const handleGenerateCaptions = async () => {
    if (loading) return;
    
    setLoading(true);
    
    // Simulate API call delay
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // This would be the actual API call in a real app
      // const response = await fetch('/api/generate-captions', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ videoId: '123', language, style, length, platform }),
      // });
      
      // Sample response
      setCaption("🎬 Introducing our new product line! We've designed these with you in mind, focusing on quality and sustainability. Check out the link in bio to learn more about our eco-friendly initiatives. #NewProduct #Sustainability #Innovation");
      
      toast({
        title: "Captions generated",
        description: "AI has created captions based on your video content.",
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "There was an error generating captions. Please try again.",
        variant: "destructive",
      });
      console.error("Error generating captions:", error);
    } finally {
      setLoading(false);
    }
  };

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "it", label: "Italian" },
    { value: "pt", label: "Portuguese" },
    { value: "zh", label: "Chinese" },
    { value: "ja", label: "Japanese" },
  ];

  const styleOptions = [
    { value: "informative", label: "Informative" },
    { value: "casual", label: "Casual/Friendly" },
    { value: "professional", label: "Professional" },
    { value: "humorous", label: "Humorous" },
    { value: "inspirational", label: "Inspirational" },
    { value: "promotional", label: "Promotional" },
  ];

  const lengthOptions = [
    { value: "short", label: "Short (<100 chars)" },
    { value: "medium", label: "Medium (100-200 chars)" },
    { value: "long", label: "Long (>200 chars)" },
  ];

  const platformOptions = [
    { value: "instagram", label: "Instagram" },
    { value: "facebook", label: "Facebook" },
    { value: "twitter", label: "Twitter" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "tiktok", label: "TikTok" },
    { value: "youtube", label: "YouTube" },
  ];

  const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value);
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Caption Editor</h1>
          <p className="text-muted-foreground mt-1">Generate and edit engaging captions for your videos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>AI Caption Generator</CardTitle>
              <CardDescription>Customize how you want your captions to be generated</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="video-container rounded-md overflow-hidden border bg-black/5 flex items-center justify-center">
                <div className="text-center p-12">
                  <Play className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">Your video from the previous step</p>
                </div>
              </div>

              <Tabs defaultValue="generate">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="generate">Generate Caption</TabsTrigger>
                  <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                </TabsList>
                
                <TabsContent value="generate" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          {languageOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="style">Caption Style</Label>
                      <Select value={style} onValueChange={setStyle}>
                        <SelectTrigger id="style">
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent>
                          {styleOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="length">Caption Length</Label>
                      <Select value={length} onValueChange={setLength}>
                        <SelectTrigger id="length">
                          <SelectValue placeholder="Select length" />
                        </SelectTrigger>
                        <SelectContent>
                          {lengthOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="platform">Target Platform</Label>
                      <Select value={platform} onValueChange={setPlatform}>
                        <SelectTrigger id="platform">
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          {platformOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleGenerateCaptions} 
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Generate Caption
                      </>
                    )}
                  </Button>
                </TabsContent>
                
                <TabsContent value="manual" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="manual-caption">Enter Caption Manually</Label>
                    <Input 
                      id="manual-caption" 
                      placeholder="Enter your caption here..."
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="flex-1">
                      <Languages className="mr-2 h-4 w-4" />
                      Translate
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Improve with AI
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Caption Preview</CardTitle>
              <CardDescription>Edit and refine your caption</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Your caption will appear here..."
                value={caption}
                onChange={handleCaptionChange}
                className="min-h-[200px] resize-none"
              />
              
              {caption && (
                <div className="mt-4">
                  <p className="text-sm font-medium">Preview:</p>
                  <div className="mt-2 p-4 rounded-md bg-muted/30 text-sm">
                    {caption}
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">
                      Character count: {caption.length}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Hashtags: {(caption.match(/#\w+/g) || []).length}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={!caption.trim()}>
                Next: Share
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default CaptionEditor;
