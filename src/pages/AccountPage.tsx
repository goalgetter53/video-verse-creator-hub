
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Check, Upload, User, Shield, BellRing, ChevronRight, Trash2, Plus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/utils/auth";
import { useSocialAccounts } from "@/utils/socialAccounts";

const AccountPage = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { accounts, loading, connectAccount, disconnectAccount } = useSocialAccounts();
  const [isEditing, setIsEditing] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [newPlatform, setNewPlatform] = useState("instagram");
  const [newUsername, setNewUsername] = useState("");
  const [formData, setFormData] = useState({
    name: "Jane Smith",
    email: "",
    company: "Creative Studios Inc.",
    bio: "Video creator and marketing specialist with 5+ years of experience in digital content creation.",
  });

  useEffect(() => {
    if (!user && !loading) {
      navigate("/auth");
    } else if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || "",
      }));
    }
  }, [user, loading, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleConnectNewAccount = async () => {
    if (!newUsername.trim()) {
      toast({
        title: "Username required",
        description: "Please enter a username for the account",
        variant: "destructive",
      });
      return;
    }
    
    setIsConnecting(true);
    await connectAccount(newPlatform, newUsername);
    setIsConnecting(false);
    setNewUsername("");
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return <Instagram className="h-5 w-5" />;
      case 'facebook': return <Facebook className="h-5 w-5" />;
      case 'twitter': return <Twitter className="h-5 w-5" />;
      case 'linkedin': return <Linkedin className="h-5 w-5" />;
      case 'youtube': return <Youtube className="h-5 w-5" />;
      default: return <User className="h-5 w-5" />;
    }
  };

  if (!user) {
    return null; // Or a loading state
  }

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Account</h1>
          <p className="text-muted-foreground mt-1">Manage your profile and account settings</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="social">Social Accounts</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="flex flex-col items-center space-y-2">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="https://ui.shadcn.com/avatars/01.png" alt="Profile picture" />
                      <AvatarFallback>{formData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" /> 
                      Change
                    </Button>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name" 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          readOnly={true}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input 
                          id="company" 
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input 
                        id="bio" 
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                )}
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Account Preferences</CardTitle>
                <CardDescription>Manage your account settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <BellRing className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="notifications">Email Notifications</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive email notifications for important updates
                    </p>
                  </div>
                  <Switch id="notifications" defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Label>Two-Factor Authentication</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Set up <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <Label>Delete Account</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all of your content
                    </p>
                  </div>
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="social" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
                <CardDescription>Manage your connected social media accounts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {loading ? (
                  <div className="flex justify-center py-6">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : accounts.length > 0 ? (
                  accounts.map((account) => (
                    <div key={account.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`${account.color} p-2 rounded-full mr-4`}>
                          {getPlatformIcon(account.platform)}
                        </div>
                        <div>
                          <h4 className="text-sm font-medium capitalize">{account.platform}</h4>
                          <p className="text-sm text-muted-foreground">{account.username}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="flex items-center text-sm text-green-500 mr-4">
                          <Check className="h-4 w-4 mr-1" /> Connected
                        </span>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => disconnectAccount(account.id)}
                        >
                          Disconnect
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No connected accounts yet. Connect one to get started.
                  </div>
                )}

                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Connect New Account</h4>
                  <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                    <div className="flex-1">
                      <Label htmlFor="platform" className="sr-only">Platform</Label>
                      <select 
                        id="platform"
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        value={newPlatform}
                        onChange={(e) => setNewPlatform(e.target.value)}
                      >
                        <option value="instagram">Instagram</option>
                        <option value="facebook">Facebook</option>
                        <option value="twitter">Twitter</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="youtube">YouTube</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="username" className="sr-only">Username</Label>
                      <Input 
                        id="username" 
                        placeholder="Username" 
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                      />
                    </div>
                    <Button 
                      onClick={handleConnectNewAccount}
                      disabled={isConnecting}
                    >
                      {isConnecting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" />
                          Connect
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plan</CardTitle>
                <CardDescription>Manage your subscription and billing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Pro Plan</h3>
                      <p className="text-sm text-muted-foreground">$19/month, billed monthly</p>
                    </div>
                    <Button variant="outline" size="sm">Change Plan</Button>
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    Next billing date: May 9, 2025
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Payment Method</h3>
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div className="flex items-center">
                      <div className="w-10 h-6 bg-slate-800 rounded mr-3 flex items-center justify-center text-white text-xs">
                        VISA
                      </div>
                      <div>
                        <p className="text-sm">•••• •••• •••• 4242</p>
                        <p className="text-xs text-muted-foreground">Expires 12/2025</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Billing History</h3>
                  <div className="border rounded-md divide-y">
                    <div className="p-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">April 9, 2025</p>
                        <p className="text-xs text-muted-foreground">Pro Plan - Monthly</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">$19.00</p>
                        <Button variant="link" size="sm" className="h-auto p-0">
                          Download
                        </Button>
                      </div>
                    </div>
                    <div className="p-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">March 9, 2025</p>
                        <p className="text-xs text-muted-foreground">Pro Plan - Monthly</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">$19.00</p>
                        <Button variant="link" size="sm" className="h-auto p-0">
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AccountPage;
