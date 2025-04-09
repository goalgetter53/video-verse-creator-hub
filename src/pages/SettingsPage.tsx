
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Shield, Moon, Sun, Languages, BellRing, Key, Share2, Laptop } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("sk-••••••••••••••••••••••••••••••");
  const [showApiKey, setShowApiKey] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };

  const handleRegenerateKey = () => {
    setIsRegenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setApiKey("sk-" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
      setIsRegenerating(false);
      toast({
        title: "API key regenerated",
        description: "Your new API key has been generated successfully.",
      });
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your application preferences and configurations</p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage basic application settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language" className="w-full">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger id="timezone" className="w-full">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                      <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                      <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                      <SelectItem value="gmt">GMT (Greenwich Mean Time)</SelectItem>
                      <SelectItem value="cet">CET (Central European Time)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <BellRing className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="notifications">Desktop Notifications</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive desktop notifications for important events
                    </p>
                  </div>
                  <Switch id="notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Share2 className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="auto-share">Auto-Share to Social Media</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Automatically share videos to connected accounts
                    </p>
                  </div>
                  <Switch id="auto-share" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the look and feel of the application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" className="justify-start" data-theme="light">
                      <Sun className="mr-2 h-4 w-4" /> Light
                    </Button>
                    <Button variant="outline" className="justify-start" data-theme="dark">
                      <Moon className="mr-2 h-4 w-4" /> Dark
                    </Button>
                    <Button variant="default" className="justify-start" data-theme="system">
                      <Laptop className="mr-2 h-4 w-4" /> System
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="font-size">Font Size</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="font-size">
                      <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="density">Interface Density</Label>
                  <Select defaultValue="comfortable">
                    <SelectTrigger id="density">
                      <SelectValue placeholder="Select interface density" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="comfortable">Comfortable</SelectItem>
                      <SelectItem value="spacious">Spacious</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="animations">Interface Animations</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable animations throughout the interface
                    </p>
                  </div>
                  <Switch id="animations" defaultChecked />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="api" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>API Settings</CardTitle>
                <CardDescription>Manage API keys and integration settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Key className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="api-key">VideoVerse API Key</Label>
                  </div>
                  <div className="flex">
                    <Input 
                      id="api-key" 
                      value={apiKey} 
                      readOnly 
                      type={showApiKey ? "text" : "password"} 
                      className="rounded-r-none"
                    />
                    <Button 
                      variant="outline" 
                      type="button" 
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="rounded-l-none"
                    >
                      {showApiKey ? "Hide" : "Show"}
                    </Button>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleRegenerateKey}
                    disabled={isRegenerating}
                    className="mt-2"
                  >
                    {isRegenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Regenerating...
                      </>
                    ) : (
                      "Regenerate Key"
                    )}
                  </Button>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input 
                    id="webhook-url" 
                    placeholder="https://your-app.com/webhook" 
                  />
                  <p className="text-xs text-muted-foreground">
                    Receive notifications when videos are processed or published
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="api-security">Enhanced API Security</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Require additional verification for sensitive operations
                    </p>
                  </div>
                  <Switch id="api-security" defaultChecked />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
