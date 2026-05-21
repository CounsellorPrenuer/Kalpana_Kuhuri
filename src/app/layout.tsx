import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aspiring Minds',
  description: 'Academic mentoring and career guidance',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
