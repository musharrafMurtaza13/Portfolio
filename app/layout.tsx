import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hafiz Musharraf Ahmed - Senior Software Engineer & Technical Lead',
  description: 'Portfolio of Hafiz Musharraf Ahmed - Senior Software Engineer with 7+ years of experience in .NET Core, Angular, React, and SQL Server',
  keywords: 'Software Engineer, Technical Lead, .NET Core, Angular, React, Next.js, Portfolio',
  authors: [{ name: 'Hafiz Musharraf Ahmed' }],
  openGraph: {
    title: 'Hafiz Musharraf Ahmed - Senior Software Engineer',
    description: '7+ years of experience in .NET Core, Angular, React, and SQL Server',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}