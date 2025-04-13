import { Card } from "@/components/ui/card";

const stats = [
  {
    title: "총 사용자",
    value: "1,234",
    change: "+12%",
    trend: "up",
  },
  {
    title: "총 게시물",
    value: "5,678",
    change: "+8%",
    trend: "up",
  },
  {
    title: "오늘 방문자",
    value: "890",
    change: "-3%",
    trend: "down",
  },
  {
    title: "신규 가입자",
    value: "45",
    change: "+15%",
    trend: "up",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">관리자 대시보드</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold">{stat.value}</p>
              <p
                className={`ml-2 text-sm ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.change}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
