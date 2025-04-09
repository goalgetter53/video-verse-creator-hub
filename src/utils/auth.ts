
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "You have been successfully signed in.",
      });

      return data;
    } catch (error: any) {
      console.error("Error signing in:", error);
      toast({
        title: "Sign in failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
      return null;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Account created",
        description: "Please check your email to confirm your account.",
      });

      return data;
    } catch (error: any) {
      console.error("Error signing up:", error);
      toast({
        title: "Sign up failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
      return null;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error: any) {
      console.error("Error signing out:", error);
      toast({
        title: "Sign out failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  };
};
