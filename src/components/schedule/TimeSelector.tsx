
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";

interface TimeSelectorProps {
  time: string;
  setTime: (time: string) => void;
}

const TimeSelector = ({ time, setTime }: TimeSelectorProps) => {
  return (
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
  );
};

export default TimeSelector;
