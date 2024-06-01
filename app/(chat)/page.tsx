"use client";

import { Thread } from "@/components/ui/assistant-ui/thread";
import type { AI, UIState } from "@/lib/chat/actions";
import { nanoid } from "@/lib/utils";
import {
	type AppendMessage,
	AssistantRuntimeProvider,
} from "@assistant-ui/react";
import { useVercelRSCRuntime } from "@assistant-ui/react-ai-sdk";
import { useActions, useUIState } from "ai/rsc";

export default function IndexPage() {
	const { submitUserMessage } = useActions();
	const [messages, setMessages] = useUIState<typeof AI>();

	const next = async (m: AppendMessage) => {
		if (m.content[0].type !== "text")
			throw new Error("Only text messages are supported");

		const input = m.content[0].text;

		// Optimistically add user message UI
		setMessages((currentConversation: UIState) => [
			...currentConversation,
			{ id: nanoid(), role: "user", display: input },
		]);

		// Submit and get response message
		const message = await submitUserMessage(input);
		setMessages((currentConversation: UIState) => [
			...currentConversation,
			message,
		]);
	};

	const runtime = useVercelRSCRuntime({ messages, append: next });
	return (
		<AssistantRuntimeProvider runtime={runtime}>
			<Thread />
		</AssistantRuntimeProvider>
	);
}
