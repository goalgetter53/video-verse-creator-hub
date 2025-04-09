
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export type ScheduledPost = {
  id: string;
  title: string;
  platform: string;
  platforms?: Record<string, boolean>;
  date: Date;
  time: string;
  content?: string;
  status?: string;
};

export const useScheduledPosts = () => {
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        setPosts([]);
        return;
      }
      
      // Using a generic query approach to avoid type issues
      const { data, error } = await supabase
        .from('scheduled_posts')
        .select('*')
        .order('scheduled_for', { ascending: true }) as { data: any[], error: any };
      
      if (error) throw error;
      
      const formattedPosts = data.map(post => {
        const scheduledDate = new Date(post.scheduled_for);
        return {
          id: post.id,
          title: post.content.substring(0, 30) + (post.content.length > 30 ? '...' : ''),
          content: post.content,
          platform: Object.keys(post.platforms)[0] || 'multiple',
          platforms: post.platforms,
          date: scheduledDate,
          time: scheduledDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: post.status
        };
      });
      
      setPosts(formattedPosts);
    } catch (error) {
      console.error('Error fetching scheduled posts:', error);
      toast({
        title: "Failed to load scheduled posts",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const schedulePost = async (content: string, scheduledFor: Date, platforms: Record<string, boolean>) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to schedule posts",
          variant: "destructive",
        });
        return null;
      }
      
      // Using a generic query approach to avoid type issues
      const { data, error } = await supabase
        .from('scheduled_posts')
        .insert({
          user_id: session.session.user.id,
          content,
          scheduled_for: scheduledFor.toISOString(),
          platforms
        })
        .select() as { data: any[], error: any };
      
      if (error) throw error;
      
      toast({
        title: "Post scheduled",
        description: `Your post has been scheduled for ${scheduledFor.toLocaleDateString()} at ${scheduledFor.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      });
      
      await fetchPosts();
      return data[0];
    } catch (error) {
      console.error('Error scheduling post:', error);
      toast({
        title: "Failed to schedule post",
        description: "Please try again later",
        variant: "destructive",
      });
      return null;
    }
  };

  const deletePost = async (id: string) => {
    try {
      // Using a generic query approach to avoid type issues
      const { error } = await supabase
        .from('scheduled_posts')
        .delete()
        .eq('id', id) as { error: any };
      
      if (error) throw error;
      
      toast({
        title: "Post removed",
        description: "The scheduled post has been removed.",
      });
      
      await fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Failed to delete post",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchPosts();
    
    // Set up auth state listener to refresh posts when auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchPosts();
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { posts, loading, schedulePost, deletePost, fetchPosts };
};
