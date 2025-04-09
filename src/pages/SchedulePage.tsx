
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { useAuth } from "@/utils/auth";
import PageHeader from "@/components/schedule/PageHeader";
import ScheduleForm from "@/components/schedule/ScheduleForm";
import ScheduledPostsList from "@/components/schedule/ScheduledPostsList";

const SchedulePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Or a loading state
  }

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <PageHeader />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ScheduleForm />
          <ScheduledPostsList />
        </div>
      </div>
    </AppLayout>
  );
};

export default SchedulePage;
