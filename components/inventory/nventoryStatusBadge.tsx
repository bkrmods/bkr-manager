type InventoryStatusBadgeProps = {
  status: string;
};

const statusConfig: Record<
  string,
  {
    label: string;
    className: string;
  }
> = {
  ACTIVE: {
    label: "Actif",
    className: "bg-green-600/20 text-green-400",
  },
  OUT_OF_STOCK: {
    label: "Rupture",
    className: "bg-red-600/20 text-red-400",
  },
  ARCHIVED: {
    label: "Archivé",
    className: "bg-gray-600/20 text-gray-400",
  },
};

export default function InventoryStatusBadge({
  status,
}: InventoryStatusBadgeProps) {
  const config = statusConfig[status] ?? {
    label: status,
    className: "bg-gray-600/20 text-gray-400",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}