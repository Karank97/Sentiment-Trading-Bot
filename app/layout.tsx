import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import FooterDisclaimer from '@/components/FooterDisclaimer';

export const metadata: Metadata = {
  title: 'NashBud | Verified dispensary deals near you',
  description:
    'NashBud helps adults discover verified dispensary deals in Middlesex County, New Jersey.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-6 pt-4 sm:px-6 lg:px-8">
          <header className="mb-6 flex items-center justify-between py-3">
            <Link href="/" className="text-2xl font-bold tracking-tight text-white">
              Nash<span className="text-nashbud-accent">Bud</span>
            </Link>
            <nav className="flex gap-2 text-sm sm:gap-4 sm:text-base">
              <Link href="/deals" className="text-nashbud-muted transition hover:text-white">
                Deals
              </Link>
              <Link href="/submit" className="text-nashbud-muted transition hover:text-white">
                Submit
              </Link>
              <Link href="/admin" className="text-nashbud-muted transition hover:text-white">
                Admin
              </Link>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
          <FooterDisclaimer />
        </div>
      </body>
    </html>
  );
}
