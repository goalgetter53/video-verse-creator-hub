
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Video, 
  Pencil, 
  Upload, 
  Calendar, 
  BarChart, 
  Settings, 
  Menu, 
  X, 
  LogOut,
  User,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
  };

  const NavItem = ({ 
    icon: Icon, 
    label, 
    to 
  }: { 
    icon: React.ElementType; 
    label: string; 
    to: string;
  }) => (
    <Link
      to={to}
      className={cn(
        "flex items-center py-3 px-4 text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors",
        collapsed ? "justify-center" : "space-x-3"
      )}
    >
      <Icon className="h-5 w-5" />
      {!collapsed && <span>{label}</span>}
    </Link>
  );

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={toggleMobile}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-sidebar fixed inset-y-0 left-0 z-50 flex flex-col border-r border-sidebar-border transition-all duration-300 md:relative",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          <Link to="/" className="flex items-center space-x-2">
            {!collapsed && (
              <span className="text-xl font-bold text-sidebar-foreground">VideoVerse</span>
            )}
            {collapsed && <Video className="h-6 w-6 text-brand-600" />}
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:flex"
            onClick={toggleSidebar}
          >
            {collapsed ? (
              <Menu className="h-5 w-5" />
            ) : (
              <X className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={toggleMobile}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3">
          <div className="space-y-1">
            <NavItem icon={Home} label="Dashboard" to="/" />
            <NavItem icon={Video} label="Create Video" to="/create" />
            <NavItem icon={Pencil} label="Caption Editor" to="/captions" />
            <NavItem icon={Upload} label="Upload & Share" to="/share" />
            <NavItem icon={Calendar} label="Schedule" to="/schedule" />
            <NavItem icon={BarChart} label="Analytics" to="/analytics" />
          </div>
        </div>

        <div className="border-t border-sidebar-border p-3">
          <div className="space-y-1">
            <NavItem icon={User} label="Account" to="/account" />
            <NavItem icon={Settings} label="Settings" to="/settings" />
            <Button 
              variant="ghost" 
              className={cn(
                "w-full flex items-center py-3 px-4 text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors",
                collapsed ? "justify-center" : "space-x-3"
              )}
            >
              <LogOut className="h-5 w-5" />
              {!collapsed && <span>Logout</span>}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
