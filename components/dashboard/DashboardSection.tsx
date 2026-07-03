type DashboardSectionProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function DashboardSection({
  title,
  subtitle,
  children,
}: DashboardSectionProps) {
  return (
    <section className="rounded-2xl border border-gray-800 bg-[#111827] p-6 shadow-lg">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-sm text-gray-400">
            {subtitle}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}