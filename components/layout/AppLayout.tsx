import Sidebar from "./Sidebar";
import Header from "./Header";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#0B0F19]">
      <Sidebar />

      <main className="flex-1">
        <Header />
        {children}
      </main>
    </div>
  );
}