import {
  ComposerPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
} from "@assistant-ui/react";
import React, { PropsWithChildren, type FC } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ArrowDownIcon, SendHorizonalIcon } from "lucide-react";

export const Thread: FC = () => {
  return (
    <TooltipProvider>
      <ThreadPrimitive.Root className="flex h-full flex-col items-center pb-3">
        <ThreadPrimitive.Viewport className="flex w-full flex-grow flex-col items-center overflow-y-scroll scroll-smooth px-4 pt-12">
          <ThreadPrimitive.Empty>
            <ThreadEmpty />
          </ThreadPrimitive.Empty>

          <ThreadPrimitive.Messages
            components={{
              UserMessage,
              AssistantMessage,
            }}
          />

          <ThreadScrollToBottom />
        </ThreadPrimitive.Viewport>

        <Composer />
      </ThreadPrimitive.Root>
    </TooltipProvider>
  );
};


const ThreadEmpty: FC = () => {
  return (
		<div className="w-full max-w-2xl flex flex-col grow py-6 px-4">	
			<div className="flex flex-grow flex-col items-center justify-center">
				<Avatar>
					<AvatarFallback>C</AvatarFallback>
				</Avatar>
				<p className="mt-4 text-xl">How can I help you today?</p>

			</div>
      <div className="flex gap-4 self-stretch flex-col sm:flex-row">
        <ThreadSuggestion prompt="List flights flying from San Francisco to Rome today">
					<p className="font-semibold">List flights flying from</p>
					<p>San Francisco to Rome today</p>
        </ThreadSuggestion>
        <ThreadSuggestion prompt="What is the status of flight BA142?">
					<p className="font-semibold">What is the status</p>
					<p>of flight BA142?</p>
        </ThreadSuggestion>
      </div>
		</div>
  );
};

const ThreadSuggestion: FC<PropsWithChildren<{ prompt: string }>> = ({ prompt, children }) => {
  return (
    <ThreadPrimitive.Suggestion prompt={prompt} method="replace" autoSend asChild>
      <Button variant="outline" className="sm:basis-full flex flex-col gap-2 px-8 py-12 items-start text-md">
        {children}
      </Button>
    </ThreadPrimitive.Suggestion>
  )
}

const ThreadScrollToBottom: FC = () => {
  return (
    <div className="sticky bottom-0">
      <ThreadPrimitive.ScrollToBottom asChild>
        <IconButton
          tooltip="Scroll to bottom"
          variant="outline"
          className="-top-10 absolute rounded-full disabled:invisible"
        >
          <ArrowDownIcon className="size-4" />
        </IconButton>
      </ThreadPrimitive.ScrollToBottom>
    </div>
  );
};

const Composer: FC = () => {
  return (
    <ComposerPrimitive.Root className="flex w-[calc(100%-32px)] max-w-[40rem] items-end rounded-lg border p-0.5 shadow-sm">
      <ComposerPrimitive.Input
        placeholder="Write a message..."
        className="h-12 max-h-40 flex-grow resize-none bg-transparent p-3.5 text-sm outline-none placeholder:text-foreground/50"
      />
      <ThreadPrimitive.If running={false}>
        <ComposerPrimitive.Send className="m-2 flex h-8 w-8 items-center justify-center rounded-md bg-foreground font-bold text-2xl shadow disabled:opacity-10">
          <SendHorizonalIcon className="size-4 text-background" />
        </ComposerPrimitive.Send>
      </ThreadPrimitive.If>
      <ThreadPrimitive.If running>
        <ComposerPrimitive.Cancel className="m-3.5 flex size-5 items-center justify-center rounded-full border-2 border-foreground">
          <div className="size-2 rounded-[1px] bg-foreground" />
        </ComposerPrimitive.Cancel>
      </ThreadPrimitive.If>
    </ComposerPrimitive.Root>
  );
};

const UserMessage: FC = () => {
  return (
    <MessagePrimitive.Root className="relative flex w-full max-w-2xl gap-3 pb-12">
      <Avatar>
        <AvatarFallback>Y</AvatarFallback>
      </Avatar>

      <div className="flex-grow">
        <p className="font-semibold">You</p>

        <p className="whitespace-pre-line text-foreground">
          <MessagePrimitive.Content />
        </p>
      </div>
    </MessagePrimitive.Root>
  );
};

const AssistantMessage: FC = () => {
  return (
    <MessagePrimitive.Root className="relative flex w-full max-w-2xl gap-3 pb-12">
      <Avatar>
        <AvatarFallback>A</AvatarFallback>
      </Avatar>

      <div className="flex-grow">
        <p className="font-semibold">Assistant</p>

        <p className="whitespace-pre-line text-foreground">
          <MessagePrimitive.Content />
        </p>
      </div>
    </MessagePrimitive.Root>
  );
};

type IconButton = ButtonProps & { tooltip: string };

const IconButton: FC<IconButton> = ({
  children,
  tooltip,
  className,
  ...rest
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("size-auto p-1", className)}
          {...rest}
        >
          {children}
          <span className="sr-only">{tooltip}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">{tooltip}</TooltipContent>
    </Tooltip>
  );
};
