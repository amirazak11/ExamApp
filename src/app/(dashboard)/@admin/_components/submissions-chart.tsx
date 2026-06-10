"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", passed: 120, failed: 45 },
  { month: "Feb", passed: 180, failed: 60 },
  { month: "Mar", passed: 150, failed: 38 },
  { month: "Apr", passed: 220, failed: 72 },
  { month: "May", passed: 195, failed: 55 },
  { month: "Jun", passed: 260, failed: 80 },
  { month: "Jul", passed: 240, failed: 65 },
];

export function SubmissionsChart() {
  return (
    <div className="bg-white border border-gray-200 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Submissions Overview</h2>
          <p className="text-sm text-gray-400">Passed vs Failed — last 7 months</p>
        </div>
        <span className="text-xs bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1">
          2025
        </span>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
          />
          <Tooltip
            contentStyle={{
              border: "1px solid #e5e7eb",
              borderRadius: 0,
              fontSize: 12,
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 16 }}
            iconType="square"
          />
          <Bar dataKey="passed" name="Passed" fill="#2563eb" maxBarSize={32} />
          <Bar dataKey="failed" name="Failed" fill="#e5e7eb" maxBarSize={32} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
