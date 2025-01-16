import { auth } from "@/lib/next-auth";
import { cookies } from "next/headers";
import localFont from "next/font/local";
import { i18nInitialize } from '@/lib/i18n';

import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "next-auth/react"
import { Analytics } from '@vercel/analytics/next';
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { AppProvider } from "@/components/providers/app-provider";
import { MapProvider } from "@/components/providers/mapbox-provider";
import { ThemeProvider } from "@/components/providers/theme-provider"
import { I18nProvider } from "@/components/providers/i18n-provider";

import "../styles/globals.css";
import "../styles/custom.css";
import "../styles/theme.css";
import 'mapbox-gl/dist/mapbox-gl.css';

type Props = Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>

const namespaces = ['translation']

const geistSans = localFont({
  src: "../styles/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../styles/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default async function RootLayout({ children, params }: Props) {
  const session = await auth()
  const cookie = await cookies();

  const locale = cookie.get("LOCALE")?.value ?? params.locale;
  const { resources } = await i18nInitialize(locale, namespaces);

  return (
    <html dir="ltr" lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider session={session}>
          <I18nProvider
            locale={locale}
            resources={resources}
            namespaces={namespaces}
          >
            <ThemeProvider
              enableSystem
              attribute="class"
              defaultTheme="system"
              disableTransitionOnChange
            >
              <AppProvider>
                <MapProvider>
                  {children}
                </MapProvider>
              </AppProvider>
            </ThemeProvider>
          </I18nProvider>
        </SessionProvider>

        <Analytics />
        <Toaster />
        <SonnerToaster />
      </body>
    </html>
  );
}
