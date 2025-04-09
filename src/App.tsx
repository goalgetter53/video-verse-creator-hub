
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/utils/auth";
import Index from "./pages/Index";
import CreateVideo from "./pages/CreateVideo";
import CaptionEditor from "./pages/CaptionEditor";
import SocialShare from "./pages/SocialShare";
import SchedulePage from "./pages/SchedulePage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AccountPage from "./pages/AccountPage";
import SettingsPage from "./pages/SettingsPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/create" element={<CreateVideo />} />
          <Route path="/captions" element={<CaptionEditor />} />
          <Route path="/share" element={<SocialShare />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
