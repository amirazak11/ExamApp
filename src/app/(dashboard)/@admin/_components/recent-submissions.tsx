import { CheckCircle, XCircle, Clock } from "lucide-react";

type Status = "passed" | "failed" | "pending";

interface Submission {
  id: string;
  student: string;
  exam: string;
  score: number | null;
  status: Status;
  date: string;
}

const submissions: Submission[] = [
  { id: "1", student: "Ahmed Youssef", exam: "React Fundamentals", score: 88, status: "passed", date: "May 20, 2025" },
  { id: "2", student: "Sara Khalil", exam: "JavaScript Advanced", score: 54, status: "failed", date: "May 20, 2025" },
  { id: "3", student: "Mohamed Ali", exam: "TypeScript Basics", score: 92, status: "passed", date: "May 19, 2025" },
  { id: "4", student: "Nour Hassan", exam: "Node.js Essentials", score: null, status: "pending", date: "May 19, 2025" },
  { id: "5", student: "Omar Farouk", exam: "CSS Mastery", score: 76, status: "passed", date: "May 18, 2025" },
  { id: "6", student: "Layla Ibrahim", exam: "React Fundamentals", score: 48, status: "failed", date: "May 18, 2025" },
];

const statusConfig: Record<Status, { label: string; icon: React.ElementType; className: string }> = {
  passed: { label: "Passed", icon: CheckCircle, className: "text-emerald-600 bg-emerald-50" },
  failed: { label: "Failed", icon: XCircle, className: "text-red-600 bg-red-50" },
  pending: { label: "Pending", icon: Clock, className: "text-amber-600 bg-amber-50" },
};

export function RecentSubmissions() {
  return (
    <div className="bg-white border border-gray-200 h">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Recent Submissions</h2>
          <p className="text-sm text-gray-400">Latest student exam attempts</p>
        </div>
        <button className="text-xs text-blue-600 hover:underline">View all</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wider">
              <th className="px-5 py-3 font-medium">Student</th>
              <th className="px-5 py-3 font-medium">Exam</th>
              <th className="px-5 py-3 font-medium">Score</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {submissions.map((s) => {
              const { label, icon: Icon, className } = statusConfig[s.status];
              return (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-gray-800">{s.student}</td>
                  <td className="px-5 py-3.5 text-gray-500">{s.exam}</td>
                  <td className="px-5 py-3.5 text-gray-800">
                    {s.score !== null ? `${s.score}%` : "—"}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium ${className}`}>
                      <Icon className="size-3.5" />
                      {label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-400">{s.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
