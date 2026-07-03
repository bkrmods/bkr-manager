type PageHeaderProps = {
  title: string;
  subtitle: string;
};

export default function PageHeader({
  title,
  subtitle,
}: PageHeaderProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-4xl font-bold tracking-tight text-white">
        {title}
      </h1>

      <p className="text-gray-400">
        {subtitle}
      </p>
    </div>
  );
}