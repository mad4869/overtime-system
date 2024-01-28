import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import AuthProvider from './AuthProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Sistem Manajemen Lembur',
    template: ''
  },
  description: 'Aplikasi web untuk mengatur data pekerjaan lembur karyawan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
