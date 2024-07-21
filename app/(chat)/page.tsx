'use client'

import type { AI, UIState } from '@/lib/chat/actions'
import { nanoid } from '@/lib/utils'
import { Thread, type AppendMessage } from '@assistant-ui/react'
import {
  useVercelRSCRuntime,
  VercelRSCMessage
} from '@assistant-ui/react-ai-sdk'
import { useActions, useUIState } from 'ai/rsc'

const convertMessage = (message: UIState[number]): VercelRSCMessage => {
  return {
    id: nanoid(),
    role: message.role,
    display: (
      <>
        {message.spinner}
        {message.display}
        {message.attachments}
      </>
    )
  }
}

export default function IndexPage() {
  const { submitUserMessage } = useActions()
  const [messages, setMessages] = useUIState<typeof AI>()

  const onNew = async (m: AppendMessage) => {
    if (m.content[0].type !== 'text')
      throw new Error('Only text messages are supported')

    const input = m.content[0].text

    // Optimistically add user message UI
    setMessages((currentConversation: UIState) => [
      ...currentConversation,
      { id: nanoid(), role: 'user', display: input }
    ])

    // Submit and get response message
    const message = await submitUserMessage(input)
    setMessages((currentConversation: UIState) => [
      ...currentConversation,
      message
    ])
  }

  const runtime = useVercelRSCRuntime({ messages, convertMessage, onNew })
  return (
    <Thread
      runtime={runtime}
      welcome={{
        suggestions: [
          {
            text: 'List flights flying from San Francisco to Rome today',
            prompt: 'List flights flying from San Francisco to Rome today'
          },
          {
            text: 'What is the status of flight BA142?',
            prompt: 'What is the status of flight BA142?'
          }
        ]
      }}
    />
  )
}
