
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarIcon, Clock, Plus, Trash2, Pencil, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/utils/auth";
import { useScheduledPosts } from "@/utils/scheduledPosts";

const SchedulePage = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("12:00");
  const [content, setContent] = useState<string>("New Video Post");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("instagram");
  const [isScheduling, setIsScheduling] = useState(false);
  
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { posts, loading, schedulePost, deletePost } = useScheduledPosts();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

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

  const handleDeletePost = async (id: string) => {
    await deletePost(id);
  };

  if (!user) {
    return null; // Or a loading state
  }

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Schedule Posts</h1>
          <p className="text-muted-foreground mt-1">Plan your content calendar and schedule posts in advance</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Schedule a Post</CardTitle>
              <CardDescription>Select a date and time to schedule your video</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
              
              <div className="space-y-2">
                <Label>Post Content</Label>
                <Input
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter post content"
                />
              </div>
              
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

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Scheduled Posts</CardTitle>
              <CardDescription>Manage your upcoming content</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : posts.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Platform</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell className="capitalize">{post.platform}</TableCell>
                        <TableCell>{format(post.date, "MMM dd, yyyy")}</TableCell>
                        <TableCell>{post.time}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 mr-1">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-destructive"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No scheduled posts yet. Create one to get started.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default SchedulePage;
