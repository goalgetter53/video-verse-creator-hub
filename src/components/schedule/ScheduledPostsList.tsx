
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { useScheduledPosts } from "@/utils/scheduledPosts";

const ScheduledPostsList = () => {
  const { posts, loading, deletePost } = useScheduledPosts();

  const handleDeletePost = async (id: string) => {
    await deletePost(id);
  };

  return (
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
  );
};

export default ScheduledPostsList;
