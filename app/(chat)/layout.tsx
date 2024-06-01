import { AI } from "@/lib/chat/actions";
import { nanoid } from "@/lib/utils";
import type React from "react";

interface ChatLayoutProps {
  children: React.ReactNode;
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  const id = nanoid();
  return (
    <AI initialAIState={{ chatId: id, interactions: [], messages: [] }}>
      <div className="overflow-hidden h-screen">{children}</div>
    </AI>
  )
}
