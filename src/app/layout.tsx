import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/UI/layout/header';
import { Providers } from '@/providers/provider';
import { siteConfig } from '@/config/site.config';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth/auth';
import AppLoader from '@/hoc/app-loader';
import Title from '@/components/UI/layout/title';

export const metadata: Metadata = {
   title: siteConfig.title,
   description: siteConfig.description,
};

export default async function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const session = await auth();
   return (
      <html lang="en">
         <head>
            <link
               href="https://fonts.googleapis.com/css?family=Roboto:100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic"
               rel="stylesheet"
            />
         </head>
         <body className={`antialiased`}>
            <Providers>
               <SessionProvider session={session}>
                  <div className="flex flex-col min-h-screen">
                     <AppLoader>
                        <Header />
                        <Title />
                        <main className="max-w-5xl w-full mx-auto px-6 justify-center items-center flex-1">
                           {children}
                        </main>
                        <footer className="flex justify-center py-2 border-t-neutral-500">
                           <p>{siteConfig.description}</p>
                        </footer>
                     </AppLoader>
                  </div>
               </SessionProvider>
            </Providers>
         </body>
      </html>
   );
}
