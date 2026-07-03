export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0B0D] text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold">BKR Manager</h1>
        <p className="mt-4 text-gray-400">
          Le logiciel de gestion de BKR Mods est en cours de développement.
        </p>

        <button className="mt-10 rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700 transition">
          Commencer
        </button>
      </div>
    </main>
  );
}