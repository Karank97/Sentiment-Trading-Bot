import type { Metadata } from 'next';
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
            <a href="/" className="text-2xl font-bold tracking-tight text-white">
              Nash<span className="text-nashbud-accent">Bud</span>
            </a>
            <nav className="flex gap-2 text-sm sm:gap-4 sm:text-base">
              <a href="/deals" className="text-nashbud-muted transition hover:text-white">
                Deals
              </a>
              <a href="/submit" className="text-nashbud-muted transition hover:text-white">
                Submit
              </a>
              <a href="/admin" className="text-nashbud-muted transition hover:text-white">
                Admin
              </a>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
          <FooterDisclaimer />
        </div>
      </body>
    </html>
  );
}
