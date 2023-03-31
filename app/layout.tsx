import { Header } from '@/components/Header'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import './globals.css'

// import du provider pour utiliser useQuery
import { AppProviders } from './providers';

export const metadata = {
  title: 'Dalle-E',
  description: 'Dall_E build with open AI, Next Js, Prisma and tailwind Css',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <AppProviders>
        <body className='bg-openAI_Secondary'>
          <Header />
          {children}
          <ReactQueryDevtools />
        </body>
      </AppProviders>
    </html>
  )
}
