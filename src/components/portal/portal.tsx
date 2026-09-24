import { useEffect } from "react";
import { AdminDurationPanel } from "@/components/portal/admin-panel";
import { DesktopApp, MobileApp, ModeSwitcher, PhoneFrame } from "@/components/portal/shells";
import { useLesson } from "@/lib/lesson-store";

export function Portal() {
  const layout = useLesson((s) => s.layout);
  const tickSecond = useLesson((s) => s.tickSecond);

  useEffect(() => {
    const id = window.setInterval(() => tickSecond(), 1000);
    return () => window.clearInterval(id);
  }, [tickSecond]);

  return (
    <>
      <div className="flex h-dvh flex-col lg:hidden">
        <AdminDurationPanel compact />
        <div className="min-h-0 flex-1">
          <MobileApp framed={false} />
        </div>
      </div>
      <div className="hidden min-h-screen flex-col bg-canvas lg:flex">
        <ModeSwitcher />
        <AdminDurationPanel />
        <main className="flex min-h-0 flex-1 items-stretch justify-center p-4">
          {layout === "web" ? <DesktopApp /> : <PhoneFrame />}
        </main>
      </div>
    </>
  );
}
