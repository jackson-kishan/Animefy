
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import "../../globals.css";
import AdminNavbar from '@/components/admin-navbar';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Animefy Dashboard',
  description: 'Admin dashboard for Animefy',
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>

       <AdminNavbar>
          {children}
       </AdminNavbar>

        {/* <Analytics /> */}
        {/* {children} */}
      </body>
    </html>
  )
}
