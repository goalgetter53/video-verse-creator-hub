
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, LineChart, ResponsiveContainer, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Line, PieChart, Pie, Cell, Legend } from "recharts";
import { ArrowUpRight, ArrowDownRight, Users, Eye, ThumbsUp, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon } from "lucide-react";

const AnalyticsPage = () => {
  // Sample data for charts
  const viewsData = [
    { name: "Apr 1", views: 120 },
    { name: "Apr 2", views: 145 },
    { name: "Apr 3", views: 210 },
    { name: "Apr 4", views: 180 },
    { name: "Apr 5", views: 250 },
    { name: "Apr 6", views: 310 },
    { name: "Apr 7", views: 280 },
  ];

  const engagementData = [
    { name: "Apr 1", likes: 45, comments: 12, shares: 8 },
    { name: "Apr 2", likes: 52, comments: 18, shares: 10 },
    { name: "Apr 3", likes: 78, comments: 24, shares: 15 },
    { name: "Apr 4", likes: 65, comments: 19, shares: 12 },
    { name: "Apr 5", likes: 98, comments: 32, shares: 24 },
    { name: "Apr 6", likes: 115, comments: 38, shares: 30 },
    { name: "Apr 7", likes: 105, comments: 29, shares: 26 },
  ];

  const platformData = [
    { name: "Instagram", value: 45 },
    { name: "Facebook", value: 28 },
    { name: "Twitter", value: 15 },
    { name: "LinkedIn", value: 12 },
  ];
  
  const COLORS = ['#4f46e5', '#0ea5e9', '#10b981', '#ef4444'];

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground mt-1">Track your video performance across platforms</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Select defaultValue="last7days">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="last7days">Last 7 days</SelectItem>
                <SelectItem value="last30days">Last 30 days</SelectItem>
                <SelectItem value="thismonth">This month</SelectItem>
                <SelectItem value="lastmonth">Last month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4,218</div>
              <div className="flex items-center text-xs text-green-500">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                <span>12% from last period</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              <ThumbsUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6.8%</div>
              <div className="flex items-center text-xs text-green-500">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                <span>2.1% from last period</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Followers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,485</div>
              <div className="flex items-center text-xs text-green-500">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                <span>8% from last period</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4%</div>
              <div className="flex items-center text-xs text-red-500">
                <ArrowDownRight className="mr-1 h-4 w-4" />
                <span>0.5% from last period</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview" className="flex items-center">
              <BarChart3 className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="engagement" className="flex items-center">
              <LineChartIcon className="mr-2 h-4 w-4" />
              Engagement
            </TabsTrigger>
            <TabsTrigger value="platforms" className="flex items-center">
              <PieChartIcon className="mr-2 h-4 w-4" />
              Platforms
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Views Over Time</CardTitle>
                <CardDescription>Daily video views for the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={viewsData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Bar dataKey="views" fill="#4f46e5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="engagement" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>Likes, comments, and shares over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={engagementData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="likes" stroke="#4f46e5" strokeWidth={2} />
                      <Line type="monotone" dataKey="comments" stroke="#10b981" strokeWidth={2} />
                      <Line type="monotone" dataKey="shares" stroke="#ef4444" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="platforms" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Platform Distribution</CardTitle>
                <CardDescription>Views by social media platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={platformData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {platformData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AnalyticsPage;
