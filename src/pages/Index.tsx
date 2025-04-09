
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Upload, Clock, BarChart3, RefreshCw, Plus, Film, Pencil } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  // Mock data for recent videos
  const recentVideos = [
    { id: 1, title: "Product Showcase", status: "Published", platform: "Instagram", views: 1250, engagement: "High" },
    { id: 2, title: "How-To Tutorial", status: "Scheduled", platform: "YouTube", scheduledFor: "2025-04-11" },
    { id: 3, title: "Team Update", status: "Draft", platform: "LinkedIn" },
  ];

  return (
    <AppLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome to VideoVerse</h1>
            <p className="text-muted-foreground mt-1">Your all-in-one video creation and sharing platform</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button asChild>
              <Link to="/create">
                <Plus className="mr-2 h-4 w-4" />
                New Video
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
              <Film className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <Upload className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Across 3 platforms</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Next: Tomorrow at 9 AM</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4,218</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Recent Videos</CardTitle>
              <CardDescription>Manage your recent video projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentVideos.map((video) => (
                  <div key={video.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                        <Video className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{video.title}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span className="mr-2">{video.platform}</span>
                          <span>
                            {video.status === "Published" ? (
                              <span className="text-green-500 font-medium">{video.status}</span>
                            ) : video.status === "Scheduled" ? (
                              <span className="text-blue-500 font-medium">
                                {video.status} for {video.scheduledFor}
                              </span>
                            ) : (
                              <span className="text-amber-500 font-medium">{video.status}</span>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {video.status === "Published" && (
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">{video.views.toLocaleString()}</span> views
                        </div>
                      )}
                      <Button size="sm" variant="ghost">
                        <Link to={`/videos/${video.id}`}>View</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Link to="/videos" className="w-full flex items-center justify-center">
                  View All Videos
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and workflows</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/create" className="flex items-center">
                  <Video className="mr-2 h-4 w-4" />
                  Create a new video
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/captions" className="flex items-center">
                  <Pencil className="mr-2 h-4 w-4" />
                  Generate captions
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/share" className="flex items-center">
                  <Upload className="mr-2 h-4 w-4" />
                  Share to social media
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/schedule" className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  Schedule a post
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/analytics" className="flex items-center">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View analytics
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/accounts" className="flex items-center">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Sync social accounts
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
