import { LucideIcon } from "lucide-react";

export interface KPI {
  label: string;
  value: number | string;
  trend: "up" | "down" | "neutral";
  goal: number;
  unit: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  description: string;
}

export interface Kudos {
  id: string;
  from: string;
  message: string;
  timestamp: string;
  avatar: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  isSelf?: boolean;
}
