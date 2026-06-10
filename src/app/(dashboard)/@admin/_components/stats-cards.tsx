import { Users, BookOpen, ClipboardList, TrendingUp } from "lucide-react";

const stats = [
  {
    label: "Total Students",
    value: "1,284",
    change: "+12% this month",
    icon: Users,
    accent: "bg-blue-600",
    light: "bg-blue-50 text-blue-600",
  },
  {
    label: "Total Exams",
    value: "48",
    change: "+3 this week",
    icon: BookOpen,
    accent: "bg-indigo-600",
    light: "bg-indigo-50 text-indigo-600",
  },
  {
    label: "Submissions",
    value: "9,320",
    change: "+5% this month",
    icon: ClipboardList,
    accent: "bg-violet-600",
    light: "bg-violet-50 text-violet-600",
  },
  {
    label: "Pass Rate",
    value: "73%",
    change: "+2% vs last month",
    icon: TrendingUp,
    accent: "bg-emerald-600",
    light: "bg-emerald-50 text-emerald-600",
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white border border-gray-200 p-5 flex gap-4 items-start hover:border-blue-200 transition-colors"
        >
          <div className={`p-3 ${stat.light}`}>
            <stat.icon className="size-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">{stat.value}</p>
            <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
