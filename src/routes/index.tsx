import { createFileRoute } from "@tanstack/react-router";
import { Portal } from "@/components/portal/portal";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <Portal />;
}
