
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarIcon, Clock, Plus, Check, Trash2, Pencil } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const SchedulePage = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("12:00");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("instagram");
  const [scheduledPosts, setScheduledPosts] = useState([
    { id: 1, title: "Product Demo", platform: "Instagram", date: new Date(2025, 3, 11), time: "14:30" },
    { id: 2, title: "Team Update", platform: "LinkedIn", date: new Date(2025, 3, 15), time: "10:00" },
    { id: 3, title: "Feature Announcement", platform: "Twitter", date: new Date(2025, 3, 20), time: "16:45" },
  ]);
  const { toast } = useToast();

  const handleSchedulePost = () => {
    if (!date) {
      toast({
        title: "Date required",
        description: "Please select a date for scheduling.",
        variant: "destructive",
      });
      return;
    }

    // Add new scheduled post
    const newPost = {
      id: scheduledPosts.length + 1,
      title: "New Video Post",
      platform: selectedPlatform,
      date: date,
      time: time,
    };

    setScheduledPosts([...scheduledPosts, newPost]);
    
    toast({
      title: "Post scheduled",
      description: `Your post has been scheduled for ${format(date, "PPP")} at ${time}`,
    });
    
    // Reset form
    setDate(undefined);
    setTime("12:00");
  };

  const handleDeletePost = (id: number) => {
    setScheduledPosts(scheduledPosts.filter(post => post.id !== id));
    toast({
      title: "Post removed",
      description: "The scheduled post has been removed.",
    });
  };

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
              <Button className="w-full" onClick={handleSchedulePost}>
                <Plus className="mr-2 h-4 w-4" />
                Schedule Post
              </Button>
            </CardFooter>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Scheduled Posts</CardTitle>
              <CardDescription>Manage your upcoming content</CardDescription>
            </CardHeader>
            <CardContent>
              {scheduledPosts.length > 0 ? (
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
                    {scheduledPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell>{post.platform}</TableCell>
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
