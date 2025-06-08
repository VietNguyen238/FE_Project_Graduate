interface DashboardCardProps {
  title: string;
  value: string;
  isUnit?: boolean;
  unit?: string;
}

export default function DashboardCard({
  title,
  value,
  unit,
  isUnit = false,
}: DashboardCardProps) {
  return (
    <div className="bg-white p-6 shadow-md">
      <h3 className="text-lg font-semibold text-gray-500">{title}</h3>
      <p className="mt-2 text-3xl font-bold text-gray-900">
        {value}
        {isUnit && "₫"}
        {unit}
      </p>
    </div>
  );
}
