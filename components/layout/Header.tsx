import { Bell, Search, User } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-gray-800 bg-[#0F172A] px-8 py-5">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Bonjour Daris 👋
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          Bienvenue sur BKR Manager
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-xl border border-gray-700 p-3 text-gray-400 transition hover:bg-gray-800 hover:text-white">
          <Search size={18} />
        </button>

        <button className="rounded-xl border border-gray-700 p-3 text-gray-400 transition hover:bg-gray-800 hover:text-white">
          <Bell size={18} />
        </button>

        <button className="rounded-xl border border-gray-700 p-3 text-gray-400 transition hover:bg-gray-800 hover:text-white">
          <User size={18} />
        </button>
      </div>
    </header>
  );
}