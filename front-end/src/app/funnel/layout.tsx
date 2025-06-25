import { FunnelProvider } from "@/contexts/funnel-context";

export default function FunnelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FunnelProvider>{children}</FunnelProvider>;
}
