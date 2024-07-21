import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import '@/app/globals.css'
import { cn } from '@/lib/utils'

export const metadata = {
  metadataBase: new URL('https://gemini.vercel.ai'),
  title: {
    default: 'Next.js Gemini Chatbot',
    template: `%s - Next.js Gemini Chatbot`
  },
  description:
    'Build your own generative UI chatbot using the Vercel AI SDK and Google Gemini',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'font-sans antialiased',
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <div className="flex flex-col min-h-screen">
          <main className="flex flex-col flex-1">{children}</main>
        </div>
      </body>
    </html>
  )
}
