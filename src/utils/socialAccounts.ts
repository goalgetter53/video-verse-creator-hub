
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export type SocialAccount = {
  id: string;
  platform: string;
  username: string;
  connected: boolean;
  color: string;
};

export type SocialAccountWithToken = SocialAccount & {
  access_token?: string | null;
  refresh_token?: string | null;
  expires_at?: string | null;
};

export const useSocialAccounts = () => {
  const [accounts, setAccounts] = useState<SocialAccountWithToken[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        setAccounts([]);
        return;
      }
      
      const { data, error } = await supabase
        .from('social_accounts')
        .select('*');
      
      if (error) throw error;
      
      const platformColors = {
        instagram: "bg-pink-500",
        facebook: "bg-blue-600",
        twitter: "bg-sky-400",
        linkedin: "bg-blue-700",
        youtube: "bg-red-600"
      };
      
      const formattedAccounts = data.map(account => ({
        id: account.id,
        platform: account.platform,
        username: account.username,
        connected: true,
        color: platformColors[account.platform as keyof typeof platformColors] || "bg-gray-500",
        access_token: account.access_token,
        refresh_token: account.refresh_token,
        expires_at: account.expires_at
      }));
      
      setAccounts(formattedAccounts);
    } catch (error) {
      console.error('Error fetching social accounts:', error);
      toast({
        title: "Failed to load social accounts",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const connectAccount = async (platform: string, username: string) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to connect social accounts",
          variant: "destructive",
        });
        return;
      }
      
      const { data, error } = await supabase
        .from('social_accounts')
        .insert({
          user_id: session.session.user.id,
          platform,
          username,
          access_token: "mock-token-" + Date.now(), // In a real app, this would be the OAuth token
        })
        .select();
      
      if (error) throw error;
      
      toast({
        title: "Account connected",
        description: `Your ${platform} account has been connected successfully`,
      });
      
      await fetchAccounts();
      return data[0];
    } catch (error) {
      console.error('Error connecting account:', error);
      toast({
        title: "Failed to connect account",
        description: "Please try again later",
        variant: "destructive",
      });
      return null;
    }
  };

  const disconnectAccount = async (id: string) => {
    try {
      const { error } = await supabase
        .from('social_accounts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Account disconnected",
        description: "Your social account has been disconnected",
      });
      
      await fetchAccounts();
    } catch (error) {
      console.error('Error disconnecting account:', error);
      toast({
        title: "Failed to disconnect account",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchAccounts();
    
    // Set up auth state listener to refresh accounts when auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchAccounts();
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { accounts, loading, connectAccount, disconnectAccount, fetchAccounts };
};
